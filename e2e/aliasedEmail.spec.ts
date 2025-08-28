import type {
  AliasType,
  CopyHistoryType,
  TotalLocalStorage,
} from "@/components/types"
import test, { expect } from "@playwright/test"

const email = "test@example.com"
const aliasedEmail = "test+SugarFire@example.com"
test.describe("aliased emails", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("")
  })

  test("stores expected data", async ({ page }) => {
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="alias"]', "Sugar Fire")
    await page.press('input[type="alias"]', "Enter")
    await page.getByText("Time").click()
    await expect(page.getByTestId("timestampEnabled")).not.toBeChecked()
    await expect(page.getByTestId("copyEmail")).toContainText(aliasedEmail)
    await page.getByTestId("copyEmail").click()
    const savedLocalStorage = (await page.context().storageState()).origins[0]
    expect(savedLocalStorage.localStorage.length).toBe(5)
    const expectedStorage: TotalLocalStorage = [
      {
        name: "selectedAlias",
        value: "SugarFire",
      },
      {
        name: "email",
        value: email,
      },
      {
        name: "copyHistory",
        value: [{ id: 0, type: "email", value: aliasedEmail }],
      },
      {
        name: "aliases",
        value: [{ label: "SugarFire", value: "SugarFire" }],
      },
      {
        name: "timestampEnabled",
        value: false,
      },
    ]

    const expectedStorageMap = Object.fromEntries(
      expectedStorage.map((item) => [item.name, item.value])
    )
    const savedLocalStorageMap = Object.fromEntries(
      savedLocalStorage.localStorage.map((item) => [
        item.name,
        JSON.parse(item.value),
      ])
    )

    for (const key in expectedStorageMap) {
      if (key === "copyHistory") {
        //@ts-ignore
        const expectedCopyHistory: CopyHistoryType = expectedStorageMap[key]
        const storedCopyHistory: CopyHistoryType = savedLocalStorageMap[key]
        expect(storedCopyHistory).toMatchObject(expectedCopyHistory)
      } else if (key === "aliases") {
        //@ts-ignore
        const expectedAliases: AliasType[] = expectedStorageMap[key]
        const storedAliases: AliasType[] = savedLocalStorageMap[key]
        expect(storedAliases).toMatchObject(expectedAliases)
      } else {
        expect(JSON.stringify(savedLocalStorageMap[key])).toMatch(
          JSON.stringify(expectedStorageMap[key])
        )
      }
    }
    await expect(page.getByTestId(aliasedEmail)).toBeVisible()
  })

  // Test if the copy history is stored correctly in local storage

  test("stores copy history", async ({ page }) => {
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="alias"]', "Sugar Fire")
    await page.press('input[type="alias"]', "Enter")
    await page.getByText("Time").click()
    await expect(page.getByTestId("timestampEnabled")).not.toBeChecked()
    await expect(page.getByTestId("copyEmail")).toContainText(aliasedEmail)
    await page.getByTestId("copyEmail").click()
    const savedLocalStorage = (await page.context().storageState()).origins[0]
    const copyHistory = savedLocalStorage.localStorage.find(
      (item) => item.name === "copyHistory"
    )
    const parsedCopyHistory = copyHistory ? JSON.parse(copyHistory.value) : []

    // Check if timestamp exists and is a number
    expect(parsedCopyHistory[0]).toHaveProperty("timestamp")
    expect(typeof parsedCopyHistory[0].timestamp).toBe("number")

    // Remove the timestamp property for comparison
    parsedCopyHistory[0].timestamp = undefined

    // Now compare the rest of the object
    expect(parsedCopyHistory).toEqual([
      { id: 0, type: "email", value: aliasedEmail },
    ])
  })

  test("copies to clipboard", async ({ page }) => {
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="alias"]', "Sugar Fire")
    await page.press('input[type="alias"]', "Enter")
    // disable the timestamp
    await page.getByText("Time").click()
    await expect(page.getByTestId("timestampEnabled")).not.toBeChecked()
    await expect(page.getByTestId("copyEmail")).toContainText(aliasedEmail)
    await page.getByTestId("copyEmail").click()

    const handle = await page.evaluateHandle(() =>
      navigator.clipboard.readText()
    )
    const clipboardText = await handle.jsonValue()
    expect(clipboardText).toBe(aliasedEmail)
  })
})

test.describe("aliased emails with timestamp", () => {
  test.describe.configure({
    retries: 2,
  })

  test.beforeEach(async ({ page }) => {
    await page.goto("")
  })

  test("the timestamp saved is correct", async ({ page }) => {
    await page.fill('input[type="email"]', email)
    await page.getByTestId("copyEmail").click()

    const now = new Date()
    // compare the timestamp in the email object in localstorage with the current time
    const savedLocalStorage = (await page.context().storageState()).origins[0]
    const copyHistory = savedLocalStorage.localStorage.find(
      (item) => item.name === "copyHistory"
    )
    const parsedCopyHistory = copyHistory ? JSON.parse(copyHistory.value) : []
    const timestamp = parsedCopyHistory[0].timestamp
    const date = new Date(Number.parseInt(timestamp))

    expect((date.getUTCMinutes() + date.getUTCSeconds()) / 10000).toBeCloseTo(
      (now.getUTCMinutes() + now.getUTCSeconds()) / 10000,
      1
    )
  })
})
