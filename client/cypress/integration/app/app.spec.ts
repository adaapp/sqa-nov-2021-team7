import * as cypress from "cypress";

describe('to-do app', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    Cypress.on('fail', (error, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should successfully create a todo item', () => {
        cy.get('[data-test-id=title-input]').type("Title");
        cy.get('[data-test-id=description-input]').type("Description");
        cy.get('[data-test-id=create-button]').click();

        cy.get('[data-test-id=feedback]').should('be.visible');
        cy.get('[data-test-id=feedback]').contains('Successfully created a todo item.');
    });

    it('should show an error message if it fails to create a todo item', () => {
        cy.intercept('POST', '/todo', { statusCode: 400, body: { status: false, message: "Failed to create todo item." }});

        cy.get('[data-test-id=description-input]').type("Description");
        cy.get('[data-test-id=create-button]').click();

        cy.get('[data-test-id=feedback]').should('be.visible');
        cy.get('[data-test-id=feedback]').contains('Failed to create a todo item.');
    });
})
