import { config } from "@/config";

describe("The Home Page", () => {
	it("successfully loads", () => {
		cy.visit("/");
		cy.findByRole("heading", { name: new RegExp(`${config.pageName}`) }).should("exist");
	});
});
