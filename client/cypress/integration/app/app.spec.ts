import { UpdateData } from '../../../../api/src/core/types/todo';
import * as cypress from "cypress";

const ONE_MINUTE_IN_MILLISECONDS = 60000;

const formatTime = (time: number): string => {
    const date = new Date(time);

    return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
};

describe('to-do app', () => {
    describe("sorting ", () => {
        beforeEach(() => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title: "Title 1", description: "Description 1", dateCreated: new Date().getTime(), dateDue: new Date().getTime() },
                    { title: "Title 2", description: "Description 2", dateCreated: new Date().getTime() + 5 * ONE_MINUTE_IN_MILLISECONDS, dateDue: new Date().getTime() + 5 * ONE_MINUTE_IN_MILLISECONDS },
                    { title: "Title 3", description: "Description 3", dateCreated: new Date().getTime() + 10 * ONE_MINUTE_IN_MILLISECONDS, dateDue: new Date().getTime() + 10 * ONE_MINUTE_IN_MILLISECONDS }
                ]
            }).as("getItems");

            cy.visit('http://localhost:3000');

            cy.wait('@getItems');
        });

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

    describe("searching ", () => {
        beforeEach(() => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title: "Apple", description: "iPhone", dateCreated: new Date().getTime(), dateDue: new Date().getTime() },
                    { title: "Banana", description: "Cake", dateCreated: new Date().getTime() + 5 * ONE_MINUTE_IN_MILLISECONDS, dateDue: new Date().getTime() + 5 * ONE_MINUTE_IN_MILLISECONDS },
                    { title: "Carrot", description: "Juice", dateCreated: new Date().getTime() + 10 * ONE_MINUTE_IN_MILLISECONDS, dateDue: new Date().getTime() + 10 * ONE_MINUTE_IN_MILLISECONDS },
                    { title: "Almond", description: "Fruitcake", dateCreated: new Date().getTime() + 10 * ONE_MINUTE_IN_MILLISECONDS, dateDue: new Date().getTime() + 10 * ONE_MINUTE_IN_MILLISECONDS }
                ]
            }).as("getItems");

            cy.visit('http://localhost:3000');

            cy.wait('@getItems');
        });

        it('should search for existing todo items based on title and description that contains the search value', () => {
            cy.get('[data-test-id=search-input]').type("Apple");

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Apple');
            cy.get('[data-test-id=todo-item-0]').contains('iPhone');

            cy.get('[data-test-id=todo-item-1]').should('not.exist');
            cy.get('[data-test-id=todo-item-2]').should('not.exist');

            cy.get('[data-test-id=search-input]').clear();
            cy.get('[data-test-id=search-input]').type("Cake");

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Banana');
            cy.get('[data-test-id=todo-item-0]').contains('Cake');
            cy.get('[data-test-id=todo-item-1]').contains('Almond');
            cy.get('[data-test-id=todo-item-1]').contains('Fruitcake');

            cy.get('[data-test-id=todo-item-2]').should('not.exist');
            cy.get('[data-test-id=todo-item-3]').should('not.exist');
        });

        it('should search for existing todo items regardless of case sensitivity', () => {
            cy.get('[data-test-id=search-input]').type("Carrot");

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Carrot');
            cy.get('[data-test-id=todo-item-0]').contains('Juice');

            cy.get('[data-test-id=search-input]').clear();
            cy.get('[data-test-id=search-input]').type("carrot");

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Carrot');
            cy.get('[data-test-id=todo-item-0]').contains('Juice');
        });

        it('should not return any results if it cannot match any title or description', () => {
            cy.get('[data-test-id=search-input]').type("SpaceX sponsored this assignment.");

            cy.get('[data-test-id=todo-item-0]').should('not.exist');
            cy.get('[data-test-id=todo-item-1]').should('not.exist');
            cy.get('[data-test-id=todo-item-2]').should('not.exist');
            cy.get('[data-test-id=todo-item-3]').should('not.exist');
        });

        it('should sort the search results by ascending and descending order', () => {
            cy.get('[data-test-id=search-input]').type("Cake");

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Banana');
            cy.get('[data-test-id=todo-item-0]').contains('Cake');
            cy.get('[data-test-id=todo-item-1]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').contains('Almond');
            cy.get('[data-test-id=todo-item-1]').contains('Fruitcake');

            cy.get('[data-test-id=sort-button-descending]').click();
            cy.get('[data-test-id=todo-item-0]').contains('Almond');
            cy.get('[data-test-id=todo-item-0]').contains('Fruitcake');
            cy.get('[data-test-id=todo-item-1]').contains('Banana');
            cy.get('[data-test-id=todo-item-1]').contains('Cake');

            cy.get('[data-test-id=sort-button-ascending]').click();
            cy.get('[data-test-id=todo-item-0]').contains('Banana');
            cy.get('[data-test-id=todo-item-0]').contains('Cake');
            cy.get('[data-test-id=todo-item-1]').contains('Almond');
            cy.get('[data-test-id=todo-item-1]').contains('Fruitcake');
        });

        it('should reset back to default if there is no search value', () => {
            cy.get('[data-test-id=search-input]').type("Almond");

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains('Almond');
            cy.get('[data-test-id=todo-item-0]').contains('Fruitcake');

            cy.get('[data-test-id=todo-item-1]').should('not.exist');
            cy.get('[data-test-id=todo-item-2]').should('not.exist');
            cy.get('[data-test-id=todo-item-3]').should('not.exist');

            cy.get('[data-test-id=search-input]').clear();
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').should('be.visible');
            cy.get('[data-test-id=todo-item-2]').should('be.visible');
            cy.get('[data-test-id=todo-item-3]').should('be.visible');
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

    describe('delete todo items', () => {
        const id = 12345;

        beforeEach(() => {
            cy.visit('http://localhost:3000');
        });

        it('should delete an item when the delete button is clicked', () => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    {
                        title: 'Title',
                        description: 'Description',
                        dateCreated: new Date().getTime(),
                        dateDue: new Date().getTime(),
                        id
                    }
                ]
            }).as('getItems');

            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');

            cy.intercept('DELETE', `/todo/${id}`, {statusCode: 200});

            cy.get('[data-test-id=delete-button-0]').click();

            cy.get('[data-test-id=todo-item-list-container]').should('not.be.visible');
            cy.get('[data-test-id=todo-item-list-container]').should('exist');
            cy.get('[data-test-id=todo-item-0]').should('not.exist');
        });

        it('should only delete the specified item when a button is clicked', () => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title: "Title 1", description: "Description 1", dateCreated: new Date().getTime(), dateDue: new Date().getTime(), id},
                    { title: "Title 2", description: "Description 2", dateCreated: new Date().getTime(), dateDue: new Date().getTime() }
                ]
            }).as("getItems");

            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').should('be.visible');

            cy.intercept('DELETE', `/todo/${id}`, {statusCode: 200});

            cy.get('[data-test-id=delete-button-0]').click();

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').should('not.exist');
        });
    });

    describe('update todo item', () => {
        const id = 12345;

        it('should update an item when a form is submitted', () => {
            const dateCreated = new Date().getTime();

            const updatedTitle = 'updated title';
            const updatedDescription = 'updated description';
            const updatedDateDue = '2021-04-30T13:00';

            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title: "Title 1", description: "Description 1", dateCreated: dateCreated, dateDue: new Date().getTime(), id},
                ]
            }).as("getItems");

            cy.intercept('POST', `/todo/${id}`, {
                statusCode: 200,
                body: {
                    updatedTodo: {
                        title: updatedTitle,
                        description: updatedDescription,
                        dateCreated: dateCreated,
                        dateDue: new Date(updatedDateDue).getTime()
                    }
                }
            }).as('updateItem');

            cy.visit('http://localhost:3000');

            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');

            cy.get('[data-test-id=edit-button-0]').click();

            cy.get('[data-test-id=update-title]').should('be.visible');
            cy.get('[data-test-id=update-description]').should('be.visible');
            cy.get('[data-test-id=update-date-due]').should('be.visible');

            cy.get('[data-test-id=update-title]').type(updatedTitle);
            cy.get('[data-test-id=update-description]').type(updatedDescription);
            cy.get('[data-test-id=update-date-due]').click()
                .then(input => {
                    input[0].dispatchEvent(new Event('input', { bubbles: true }));
                    input.val(updatedDateDue);
                });

            cy.get('[data-test-id=update-submit]').click();

            cy.wait('@updateItem');

            cy.get('[data-test-id=todo-item-0]').contains(updatedTitle);
            cy.get('[data-test-id=todo-item-0]').contains(updatedDescription);
            cy.get('[data-test-id=todo-item-0]').contains(formatTime(new Date(updatedDateDue).getTime()));
        });

        it('should only update updated fields', () => {
            const title = 'title 1';
            const date = new Date().getTime();

            const updatedDescription = 'updated description';

            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title, description: "Description 1", dateCreated: date, dateDue: date, id},
                ]
            }).as("getItems");

            cy.intercept('POST', `/todo/${id}`, {
                statusCode: 200,
                body: {
                    updatedTodo: {
                        title: title,
                        description: updatedDescription,
                        dateCreated: date,
                        dateDue: date
                    }
                }
            }).as('updateItem');

            cy.visit('http://localhost:3000');

            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');

            cy.get('[data-test-id=edit-button-0]').click();

            cy.get('[data-test-id=update-title]').should('be.visible');
            cy.get('[data-test-id=update-description]').should('be.visible');
            cy.get('[data-test-id=update-date-due]').should('be.visible');

            cy.get('[data-test-id=update-description]').type(updatedDescription);

            cy.get('[data-test-id=update-submit]').click();

            cy.wait('@updateItem');

            cy.get('[data-test-id=todo-item-0]').contains(title);
            cy.get('[data-test-id=todo-item-0]').contains(updatedDescription);
            cy.get('[data-test-id=todo-item-0]').contains(formatTime(date));
        });
    });
});
