import { test, expect } from "@playwright/test"

test.describe("Copying things", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("the same thing copied twice should only show once in the history", async ({
    page,
  }) => {
    await page.getByText("Array").click()
    await expect(
      page.getByText(
        'Copied ["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit"]'
      )
    ).toBeVisible()

    await page.getByText("1 Sentence").click()
    await page.getByText("Array").click()
    await expect(page.getByTestId("copyHistoryItems").first()).toContainText(
      '["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit"]'
    )
    expect(
      await page
        .getByTestId("copyHistoryItems")
        .getByText(
          '["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit"]'
        )
        .count()
    ).toBe(1)
  })
})
