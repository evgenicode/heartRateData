describe("date picker", () => {
  it("user can pick dates", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".react-datepicker__input-container").first().click();
    cy.findByRole("button", { name: /next month/i }).click();
    cy.findByRole("button", { name: /previous month/i }).click();
    cy.findByRole("option", { name: /15th/i }).click();
    cy.get(".react-datepicker__input-container").eq(1).click();
    cy.findByRole("option", { name: /december 29th/i }).click();
  });
});
