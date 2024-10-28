describe("Login", () => {
  it("Go to login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get(".container.flex > :nth-child(2) > .inline-flex").click();
    cy.get(":nth-child(1) > .space-y-4 > :nth-child(1)").type(
      `test${Math.random()}`
    );
    cy.get(":nth-child(1) > .space-y-4 > :nth-child(2)").type(
      `test${Math.random()}@gmail.com`
    );
    cy.get(":nth-child(1) > .space-y-4 > :nth-child(3)").type(`#Test1234`);
    cy.get(".inline-flex.w-full").click();
  });
});
