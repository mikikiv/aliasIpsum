import { AliasType, CopyHistoryType, TotalLocalStorage } from "@/components/types"
import test, { expect } from "@playwright/test"

test.describe("aliased emails", () => {
  const email = "idxqamv@gmail.com"
  const aliasedEmail = "idxqamv+SugarFire@gmail.com"

  test("stores expected data", async ({ page }) => {
    await page.goto("/")
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="alias"]', "Sugar Fire")
    await page.press('input[type="alias"]', "Enter")
    await page.getByText("Time").click()
    await expect(page.getByTestId("timestampEnabled")).not.toBeChecked()
    expect(await page.textContent("#copyEmail")).toEqual(aliasedEmail)
    await page.click("#copyEmail")
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
})
