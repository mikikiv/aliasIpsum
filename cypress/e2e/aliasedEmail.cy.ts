describe("template spec", () => {
  const email = "idxqamv@gmail.com"
  const aliasedEmail = "idxqamv+SugarFire@gmail.com"

  it("passes", () => {
    cy.visit("/")
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="alias"]').type("Sugar Fire{enter}")
    cy.get('[data-cy="timestampEnabled"]').uncheck({ force: true })
    cy.get("#copyEmail").invoke("text").should("eq", aliasedEmail)
    cy.get("#copyEmail").click()
    cy.getAllLocalStorage().then((result) => {
      expect(result["http://localhost:3000"]).to.contain.keys(
        "email",
        "aliases",
        "copyHistory",
        "selectedAlias"
      )
    })
    cy.get(`[data-cy="${aliasedEmail}"]`).should("exist")
  })
})
