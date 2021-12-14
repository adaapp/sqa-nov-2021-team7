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

const
    title = 'Title',
    newTitle = 'New Title',
    description = 'Description',
    newDescription = 'New Description',
    dateCreated = 1639427127304,
    dateCreatedString = formatTime(dateCreated),
    dateDue = dateCreated + ONE_MINUTE_IN_MILLISECONDS,
    dateDueString = formatTime(dateDue),
    id = '12345',
    newId = '54321';

describe('to-do app', () => {
    describe("sorting ", () => {
        beforeEach(() => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title: "Title 1", description: "Description 1", dateCreated, dateDue },
                    { title: "Title 2", description: "Description 2", dateCreated: dateCreated + 5 * ONE_MINUTE_IN_MILLISECONDS, dateDue: dateDue + 5 * ONE_MINUTE_IN_MILLISECONDS },
                    { title: "Title 3", description: "Description 3", dateCreated: dateCreated + 10 * ONE_MINUTE_IN_MILLISECONDS, dateDue: dateDue + 10 * ONE_MINUTE_IN_MILLISECONDS }
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
                    { title: "Apple", description: "iPhone", dateCreated, dateDue },
                    { title: "Banana", description: "Cake", dateCreated: dateCreated + 5 * ONE_MINUTE_IN_MILLISECONDS, dateDue: dateDue + 5 * ONE_MINUTE_IN_MILLISECONDS },
                    { title: "Carrot", description: "Juice", dateCreated: dateCreated + 10 * ONE_MINUTE_IN_MILLISECONDS, dateDue: dateDue + 10 * ONE_MINUTE_IN_MILLISECONDS },
                    { title: "Almond", description: "Fruitcake", dateCreated: dateCreated + 10 * ONE_MINUTE_IN_MILLISECONDS, dateDue: dateDue + 10 * ONE_MINUTE_IN_MILLISECONDS }
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
                    todo: { title, description, dateCreated, dateDue }
                }
            });

            cy.get('[data-test-id=title-input]').type(title);
            cy.get('[data-test-id=description-input]').type(description);
            cy.get('[data-test-id=create-button]').click();

            cy.get('[data-test-id=feedback]').should('be.visible');
            cy.get('[data-test-id=feedback]').contains('Successfully created a todo item.');
        });

        it('should show an error message if it fails to create a todo item', () => {
            cy.intercept('POST', '/todo', {
                statusCode: 400,
                body: {status: false, message: "Failed to create todo item."}
            });

            cy.get('[data-test-id=description-input]').type(description);
            cy.get('[data-test-id=create-button]').click();

            cy.get('[data-test-id=feedback]').should('be.visible');
            cy.get('[data-test-id=feedback]').contains('Failed to create todo item.');
        });

        it('should automatically render the todo item after a successful response', () => {
            cy.intercept('POST', '/todo', {
                statusCode: 200,
                body: {
                    status: true,
                    todo: { title, description, dateCreated, dateDue }
                }
            });

            cy.get('[data-test-id=title-input]').type(title);
            cy.get('[data-test-id=description-input]').type(description);
            cy.get('[data-test-id=create-button]').click();

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains(title);
            cy.get('[data-test-id=todo-item-0]').contains(description);
            cy.get('[data-test-id=todo-item-0]').contains(dateCreatedString);
            cy.get('[data-test-id=todo-item-0]').contains(dateDueString);
        });
    });

    describe("get todo items", () => {
        beforeEach(() => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title, description, dateCreated, dateDue },
                    { title: newTitle, description: newDescription, dateCreated, dateDue }
                ]
            }).as("getItems");

            cy.visit('http://localhost:3000');
        });

        it('should show a list of existing todo items when the page is loaded', () => {
            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').should('be.visible');
        });

        it('should show a list of the latest todo items once the refresh button is clicked', () => {
            cy.get('[data-test-id=refresh-button]').click();
            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains(title);
            cy.get('[data-test-id=todo-item-0]').contains(description);
            cy.get('[data-test-id=todo-item-1]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').contains(newTitle);
            cy.get('[data-test-id=todo-item-1]').contains(newDescription);
        });
    });

    describe('delete todo items', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000');
        });

        it('should delete an item when the delete button is clicked', () => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [{ title, description, dateCreated, dateDue, id }]
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
                    { title, description, dateCreated, dateDue, id},
                    { title: newTitle, description, dateCreated, dateDue }
                ]
            }).as("getItems");

            cy.wait('@getItems');

            cy.get('[data-test-id=todo-item-list-container]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-1]').should('be.visible');

            cy.intercept('DELETE', `/todo/${id}`, {statusCode: 200});

            cy.get('[data-test-id=delete-button-0]').click();

            cy.get('[data-test-id=todo-item-0]').should('be.visible');
            cy.get('[data-test-id=todo-item-0]').contains(newTitle);
            cy.get('[data-test-id=todo-item-1]').should('not.exist');
        });
    });

    describe('update todo item', () => {
        const updatedDateDue = dateDue + 5 * ONE_MINUTE_IN_MILLISECONDS;

        it('should update an item when a form is submitted', () => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title, description, dateCreated, dateDue, id },
                ]
            }).as("getItems");

            cy.intercept('POST', `/todo/${id}`, {
                statusCode: 200,
                body: {
                    updatedTodo: {
                        title: newTitle,
                        description: newDescription,
                        dateCreated: dateCreated,
                        dateDue: updatedDateDue,
                        id: id
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

            cy.get('[data-test-id=update-title]').type(newTitle);
            cy.get('[data-test-id=update-description]').type(newDescription);
            cy.get('[data-test-id=update-date-due]').click()
                .then(input => {
                    input[0].dispatchEvent(new Event('input', { bubbles: true }));
                    input.val(updatedDateDue);
                });

            cy.get('[data-test-id=update-submit]').click();

            cy.wait('@updateItem');

            cy.get('[data-test-id=todo-item-0]').contains(newTitle);
            cy.get('[data-test-id=todo-item-0]').contains(newDescription);
            cy.get('[data-test-id=todo-item-0]').contains(formatTime(updatedDateDue));
        });

        it('should only update updated fields', () => {
            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title, description, dateCreated, dateDue, id },
                ]
            }).as("getItems");

            cy.intercept('POST', `/todo/${id}`, {
                statusCode: 200,
                body: {
                    updatedTodo: {
                        title, description: newDescription, dateCreated, dateDue, id
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

            cy.get('[data-test-id=update-description]').type(newDescription);

            cy.get('[data-test-id=update-submit]').click();

            cy.wait('@updateItem');

            cy.get('[data-test-id=todo-item-0]').contains(title);
            cy.get('[data-test-id=todo-item-0]').contains(newDescription);
            cy.get('[data-test-id=todo-item-0]').contains(dateDueString);
            cy.get('[data-test-id=todo-item-0]').contains(dateCreatedString);
        });

        it('should only update updated todo item', () => {
            const
                anotherNewDateCreated = dateCreated + 10 * ONE_MINUTE_IN_MILLISECONDS,
                anotherNewDateDue = dateDue + 15 * ONE_MINUTE_IN_MILLISECONDS;

            cy.intercept('GET', '/todo', {
                statusCode: 200,
                body: [
                    { title, description, dateCreated, dateDue, id },
                    { title: newTitle, description: newDescription, dateCreated: anotherNewDateCreated, dateDue: anotherNewDateDue, newId }
                ]
            }).as("getItems");

            const
                expectedTitle = 'Another new title',
                expectedDescription = 'Another new description';

            cy.intercept('POST', `/todo/${id}`, {
                statusCode: 200,
                body: {
                    updatedTodo: {
                        title: expectedTitle,
                        description: expectedDescription,
                        dateCreated: dateCreated,
                        dateDue: dateDue,
                        id: id
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

            cy.get('[data-test-id=update-title]').type(expectedTitle);
            cy.get('[data-test-id=update-description]').type(expectedDescription);

            cy.get('[data-test-id=update-submit]').click();

            cy.wait('@updateItem');

            cy.get('[data-test-id=todo-item-0]').contains(expectedTitle);
            cy.get('[data-test-id=todo-item-0]').contains(expectedDescription);
            cy.get('[data-test-id=todo-item-0]').contains(dateCreatedString);
            cy.get('[data-test-id=todo-item-0]').contains(dateDueString);

            cy.get('[data-test-id=todo-item-1]').contains(newTitle);
            cy.get('[data-test-id=todo-item-1]').contains(newDescription);
            cy.get('[data-test-id=todo-item-1]').contains(formatTime(anotherNewDateCreated));
            cy.get('[data-test-id=todo-item-1]').contains(formatTime(anotherNewDateDue));
        });
    });
});
