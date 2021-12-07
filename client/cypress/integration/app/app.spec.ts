import * as cypress from "cypress";

describe('to-do app', () => {
    describe("create items", () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000');
        });

        it('should successfully create a todo item', () => {
            cy.intercept('POST', '/todo', {
                statusCode: 200,
                body: {
                    status: true,
                    todo: {
                        title: "Title",
                        description: "Description",
                        dateCreated: 1638885206850,
                        dateDue: 1638885206850,
                        id: "7a0357de-d03a-4f37-b825-44d0e2c1298b"
                    }
                }
            });

            cy.get('[data-test-id=title-input]').type("Title");
            cy.get('[data-test-id=description-input]').type("Description");
            cy.get('[data-test-id=create-button]').click();

            cy.get('[data-test-id=feedback]').should('be.visible');
            cy.get('[data-test-id=feedback]').contains('Successfully created a todo item.');
        });

        it('should show an error message if it fails to create a todo item', () => {
            cy.intercept('POST', '/todo', {
                statusCode: 400,
                body: {status: false, message: "Failed to create todo item."}
            });

            cy.get('[data-test-id=description-input]').type("Description");
            cy.get('[data-test-id=create-button]').click();

            cy.get('[data-test-id=feedback]').should('be.visible');
            cy.get('[data-test-id=feedback]').contains('Failed to create todo item.');
        });

        it('should automatically render the todo item after a successful response', () => {
            cy.intercept('POST', '/todo', {
                statusCode: 200,
                body: {
                    status: true,
                    todo: {
                        title: "Title",
                        description: "Description",
                        dateCreated: 1638885206850,
                        dateDue: 1638885206850,
                        id: "7a0357de-d03a-4f37-b825-44d0e2c1298b"
                    }
                }
            });

            cy.get('[data-test-id=title-input]').type("Title");
            cy.get('[data-test-id=description-input]').type("Description");
            cy.get('[data-test-id=create-button]').click();

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Title');
            cy.get('[data-test-id=todo-item-0]').contains('Description');
            cy.get('[data-test-id=todo-item-0]').contains('07/12/2021, 13:53');

        });
    });

    describe("get todo items", () => {
        it('should show a list of existing todo items when the page is loaded', () => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title: "Title 1", description: "Description 1", dateCreated: new Date().getTime(), dateDue: new Date().getTime() },
                    { title: "Title 2", description: "Description 2", dateCreated: new Date().getTime(), dateDue: new Date().getTime() }
                ]
            }).as("getItems");

            cy.visit('http://localhost:3000');

            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').should('be.visible');
        });

        it('should show a list of the latest todo items once the refresh button is clicked', () => {
            cy.visit('http://localhost:3000');

            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    {
                        title: "Title",
                        description: "Description",
                        dateCreated: new Date().getTime(),
                        dateDue: new Date().getTime()
                    },
                    {
                        title: "Title 2",
                        description: "Description 2",
                        dateCreated: new Date().getTime(),
                        dateDue: new Date().getTime()
                    },
                ]
            }).as("getItems");

            cy.get('[data-test-id=refresh-button]').click();
            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Title');
            cy.get('[data-test-id=todo-item-1]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').contains('Title 2');
        });
    });
});
