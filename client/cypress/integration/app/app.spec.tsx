import * as cypress from "cypress";

describe('to-do app', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })

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
        cy.intercept('/todo', { hostname: 'localhost' }, (req) => {
            req.reply(400);
        });

        cy.get('[data-test-id=title-input]').type("Title");
        cy.get('[data-test-id=description-input]').type("Description");
        cy.get('[data-test-id=create-button]').click();

        cy.get('[data-test-id=feedback]').should('be.visible');
        cy.get('[data-test-id=feedback]').contains('Failed to create a todo item');
    });
})
