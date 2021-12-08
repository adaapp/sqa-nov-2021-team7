import * as cypress from "cypress";

const ONE_MINUTE_IN_MILLISECONDS = 60000;

describe('to-do app', () => {
    describe("sorting ", () => {
        beforeEach(() => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title: "Title 1", description: "Description 1", dateCreated: new Date().getTime(), dateDue: new Date().getTime() },
                    { title: "Title 2", description: "Description 2", dateCreated: new Date().getTime() + (5 * ONE_MINUTE_IN_MILLISECONDS), dateDue: new Date().getTime() + (5 * ONE_MINUTE_IN_MILLISECONDS) },
                    { title: "Title 3", description: "Description 3", dateCreated: new Date().getTime() + (10 * ONE_MINUTE_IN_MILLISECONDS), dateDue: new Date().getTime() + (10 * ONE_MINUTE_IN_MILLISECONDS) }
                ]
            }).as("getItems");

            cy.visit('http://localhost:3000');

            cy.wait('@getItems');
        })

        it('should sort by ascending order by default', () => {
            cy.get('[data-test-id=sort-button-descending]').should('be.visible');
            cy.get('[data-test-id=sort-button-descending]').contains('Sort by Descending');

            cy.get('[data-test-id=todo-item-0]').contains('Title 1');
            cy.get('[data-test-id=todo-item-1]').contains('Title 2');
            cy.get('[data-test-id=todo-item-2]').contains('Title 3');
        });

        it('should sort by descending order when the button is clicked when in ascending order', () => {
            cy.get('[data-test-id=sort-button-descending]').should('be.visible');
            cy.get('[data-test-id=sort-button-descending]').contains('Sort by Descending');
            cy.get('[data-test-id=sort-button-descending]').click();

            cy.get('[data-test-id=todo-item-0]').contains('Title 3');
            cy.get('[data-test-id=todo-item-1]').contains('Title 2');
            cy.get('[data-test-id=todo-item-2]').contains('Title 1');

            cy.get('[data-test-id=sort-button-ascending]').should('be.visible');
            cy.get('[data-test-id=sort-button-ascending]').contains('Sort by Ascending');
        });

        it('should sort by ascending order when the button is clicked when in descending order', () => {
            cy.get('[data-test-id=sort-button-descending]').should('be.visible');
            cy.get('[data-test-id=sort-button-descending]').contains('Sort by Descending');
            cy.get('[data-test-id=sort-button-descending]').click();

            cy.get('[data-test-id=todo-item-0]').contains('Title 3');
            cy.get('[data-test-id=todo-item-1]').contains('Title 2');
            cy.get('[data-test-id=todo-item-2]').contains('Title 1');

            cy.get('[data-test-id=sort-button-ascending]').should('be.visible');
            cy.get('[data-test-id=sort-button-ascending]').contains('Sort by Ascending');
            cy.get('[data-test-id=sort-button-ascending]').click();

            cy.get('[data-test-id=todo-item-0]').contains('Title 1');
            cy.get('[data-test-id=todo-item-1]').contains('Title 2');
            cy.get('[data-test-id=todo-item-2]').contains('Title 3');


        });
    });

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
