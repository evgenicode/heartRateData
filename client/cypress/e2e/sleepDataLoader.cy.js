describe("sleep data loader", () => {
  it("user can request sleep data from the server and interact with the result", () => {
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", "/api/getSleepData").as("getSleepData");
    cy.findByRole("button", { name: /get sleep data/i }).click();
    cy.wait("@getSleepData").then((interception) => {
      cy.get("button")
        .contains(/toggle sleep stage/i)
        .should("exist")
        .click();
      cy.get("button")
        .contains(/hide sleep data/i)
        .should("exist")
        .click()
        .click();
      cy.get("button")
        .contains(/toggle sleep stage/i)
        .should("exist")
        .click();
    });
  });
});
