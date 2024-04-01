import { test, expect } from "@playwright/test"

test.describe("Regex Replacer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.getByTestId("regex-input").fill("e")
    await page.getByTestId("regex-test-text").fill("test")
    await page.getByTestId("regex-replacement-text").fill("oa")
  })
  test("Regex things copies correctly", async ({ page }) => {
    await expect(page.getByTestId("regex-preview")).toBeVisible()
    await page.getByTestId("regex-copy").click()
    await expect(page.getByTestId("/e/g")).toContainText("0: /e/g")
    await expect(page.getByTestId("regex-function")).toContainText(
      '.replace(/e/g, "oa")'
    )
    await page.getByTestId("regex-preview").click()
    await expect(page.getByTestId("copyHistoryItems").first()).toContainText(
      "toast"
    )
  })
})
