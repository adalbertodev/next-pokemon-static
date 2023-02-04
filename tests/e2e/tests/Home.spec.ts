describe("The Home Page", () => {
	it("successfully loads", () => {
		cy.visit("/");
		cy.findByRole("img", { name: /Next.js Logo/i }).should("exist");
	});
});
