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
    const expectedStorage: TotalLocalStorage = [
      {
        name: "selectedAlias",
        value: '"SugarFire"',
      },
      {
        name: "email",
        value: `"${email}"`,
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
        value: "false",
      },
    ]

    for (let index = 0; index < expectedStorage.length; index++) {
      if (expectedStorage[index].name === "copyHistory") {
        //@ts-ignore
        const expectedCopyHistory: CopyHistoryType =
          expectedStorage[index].value
        const storedCopyHistory: CopyHistoryType = JSON.parse(
          savedLocalStorage.localStorage[index].value
        )
        expect(storedCopyHistory.type).toBe(expectedCopyHistory.type)
        expect(storedCopyHistory.id).toBe(expectedCopyHistory.id)
        expect(storedCopyHistory.timestamp).not.toBeNaN()
      } else if (expectedStorage[index].name === "aliases") {
        //@ts-ignore
        const expectedAliases: AliasType[] = expectedStorage[index].value
        const storedAliases: AliasType[] = JSON.parse(
          savedLocalStorage.localStorage[index].value
        )
        expect(storedAliases).toMatchObject(expectedAliases)
      } else {
        expect(JSON.stringify(savedLocalStorage.localStorage[index])).toMatch(
          JSON.stringify(expectedStorage[index])
        )
      }
    }

    await expect(page.getByTestId(aliasedEmail)).toBeVisible()
  })
})
