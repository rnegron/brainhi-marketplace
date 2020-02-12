import { makeServer } from "../../src/mirage/server";

let server = null;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.db.emptyData();
  server.shutdown();
});

it("should not show any provider cards", () => {
  cy.visit("/");

  cy.get("[data-test-id=no-providers]").should("exist");
});

it("should show created provider cards", () => {
  server.createList("provider", 3);

  cy.visit("/");
  cy.get("[data-test-id=no-providers]").should("not.exist");

  cy.get("[data-test-id=provider-card]").should("have.length", 3);
});

it("should navigate to the selected provider detail route", () => {
  let provider = server.create("provider");

  cy.visit("/");
  cy.get("[data-test-id=provider-detail-button]").click();

  cy.url().should("eq", `http://localhost:3000/providers/${provider.id}`);
});

it.only("should find the provider name via search", () => {
  server.create("provider");
  let provider = server.create("provider", { name: "Test" });

  cy.visit("/");

  cy.get("[data-test-id=provider-search-bar]").type("Test");

  cy.get("[data-test-id=provider-search-button]").click()

  cy.get("[data-test-id=provider-card]").should("exist");
});
