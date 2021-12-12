# sqa-nov-2021-team7

**Google Meet Link**  
https://meet.google.com/jqg-jvhc-uvk

## Table of Contents
* [The Team](#the-team)
* [About the Project](#about-the-project)
* [Features](#features)
* [Dependencies](#dependencies)
  * [Prerequisites](#prerequisites)
* [Usage](#usage)
* [Running Tests](#running-tests)
* [Project Structure](#project-structure)
* [Workflow](#workflow)
* [Testing Strategy](#testing-strategy)
* [Test Cases](#test-cases)
* [IEEE Standard](#ieee-standard)
* [Performance and Accessibility Audit](#performance-and-accessibility-audit)

## The Team
|                  Name                   |                                                         GitHub                                                         |
|:---------------------------------------:|:----------------------------------------------------------------------------------------------------------------------:|
| Samuel Crispin - **Developer & Tester** | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/SamCrispin) |
|  Hou Fai Man - **Developer & Tester**   | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/houfaiman)  |
|  Saeed Afzal - **Developer & Tester**   | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/saeedafzal) |

## About the Project
![Frontend Interface](./images/frontend-interface.png)

This repository contains a web application developed using TypeScript that enables users to create, read, update and delete
todo items. TypeScript was used to enforce strict typing and good coding practices for both the source code and the tests.
It is a full-stack project that contains a frontend written in the [React](https://reactjs.org/) framework and 
is powered by a backend server using the [Express](http://expressjs.com/) framework.

Data is persisted in-memory as a cache. It does not have a database connection, however discussions were made
about the potential solutions in the future such as MongoDB. This means that any data that was created
during the server's uptime will be lost when the server is shut down or restarted.

## Features
- Create, Read, Update, and Delete
- Searching
- Sorting

## Dependencies
The project uses the following dependencies to build and test the application:
- [TypeScript](https://www.typescriptlang.org/) (Strongly typed JavaScript)
- [Vite](https://vitejs.dev/) (Frontend tooling)
- [Express](https://expressjs.com/) (Web framework for Node.js)
- [React](https://reactjs.org/) (JavaScript library for building user interfaces)
- [Eslint](https://eslint.org/) (JavaScript linter)
- [Styled Components](https://styled-components.com/) (Inline styling for React components)
- [Axios](https://axios-http.com/) (Promise-based HTTP client)
- [Jest](https://jestjs.io/) (JavaScript testing framework)
- [Cypress](https://www.cypress.io/) (End-to-End testing framework)
- [Testing Library](https://testing-library.com/) (A utility library for React testing)

### Prerequisites

To build and run this project, you will need the following:
* [Node.js](https://nodejs.org/en/) - Note: Version 17 and above is incompatible with Cypress and will not run the tests. 
If you are using the latest version, please downgrade to 16.13.1 LTS.
* [Python 3](https://www.python.org/) - Running the load tests scripts.

## Usage
From the root directory:
### Server - http://localhost:8080
```bash
cd api 
npm install
npm start
```

### Frontend - http://localhost:3000
```bash
cd client
npm install
npm start
```

## Running Tests

### Unit Tests
```bash
cd client
npm test
# Generate coverage report
npm run test:coverage
```

### Integration Tests
```bash
cd api
npm test
# Generate coverage report
npm run test:coverage
```

### End-To-End Tests
```bash
cd client
npm run cypress:open
```

### Load Tests
See [readme](./load_tests/README.md) for instructions.

## Project Structure

### API
```
api - Directory for the API server project
    src - source code for the server
        core - core functionality
        routes - endpoints routes
    tests - integration tests
```

### Client
```
client - Directory for the frontend project
    cypress - end-to-end tests
        fixtures - responses for mocked endpoints 
        integration - integration tests
        plugins - configurations for running Cypress
        support - Additional commands for running Cypress
    mocks - Mocks for Jest
    src - source code for the frontend
        components - custom React components
        services - services for integrating with server
        types - type declarations for data models
    tests - unit and component tests
```

## Workflow
### Ceremonies
#### Stand-Ups
Daily stand-ups were held in the morning to discuss current progress and any blockers. Every day, one member of the team would
take charge of the meeting, and ask questions and provide suggestions on how to progress. This ceremony ensures that everyone
is working on a story and makes sure everyone is up-to-date with each other. Typically, the stand-ups ran for 15 minutes on
average and was conducted remotely using Microsoft Teams during work and Google Meet outside work hours.

#### Story Planning
There was a single story planning session at the beginning of this project to determine what immediate work needed to be done.
We created a list of issues and prioritised them based on essentials and enhancements that would be nice to have in the future.
We worked through the list and created issues as we picked each story up. This helps to prevent a large backlog of stories and
lets us know which stories to prioritise and work on next.

This is the high-level backlog that stories were created from:
* Create base documentation
* Create skeleton template
* Create CI/CD pipelines
* Create a todo item
* Get a single/all todo items
* Delete a single/all todo items
* Update a todo item
* Create load tests
* Add sorting feature
* Add searching feature
* Accessibility testing
* Update documentation to reflect the latest changes
* Prioritisation
  * Sorting
* MongoDB Integration
* Subtasks
* Accounts
* Locations
* Notifications

### Retrospective
A single retrospective was held at the end of two weeks since the start of the project. This allowed us to review what has
changed since the beginning and identify improvements to our current ways of working. The findings were that our current
process worked for the team. It was flexible, and catered to each member's individual schedules. It also helped other members
of the team learn about different tools within the project, for example Cypress was not too familiar with some members, but
after going over it as a group, everyone was more comfortable with it.

We conducted this meeting using an online web application called [EasyRetro](https://easyretro.io/), which allows participants
to post feedback and criticisms anonymously. The scrum master went over each point and discussed what went well and the actions to
take next time.

### Test-Driven Development
Test-driven development was the approach for creating features. This ensures the code is of high quality and is self-documented.
It changes the perception of the developer by forcing them to think how users would interact with the interface. Doing so
enables the developer to create tests that reflect the user flows. For instance, in Cypress tests, developers would think
about the different actions the user can take, such as adding incorrect inputs. The tests can accommodate these cases, which
ensures the application logic can handle these scenarios.

### Pair/Group Programming
Pair programming is the concept of working in pairs or in groups to solve a problem. Typically, one developer is the driver
and the other is the navigator. The role of the driver is to code the solution while the navigator is to observe, guide and
proofread the changes. It is an effective way to share knowledge as each team member has different skills and expertise. Working
in a pair or a group helps to transfer knowledge and also understand the entire application in-depth.

Pair programming was a regular occurrence in the team; there were times when members were not familiar with the tools and frameworks
involved therefore calls were made to discuss the problem and work through them as a team. For example, some of us were not
familiar with React, TypeScript or running the Cypress tests, so the team would often go on calls and solve the problem.
In addition, the work for the front-end and backend was split, so we had to work together to integrate end-to-end. Because
we regularly went on calls, this helped each other understand the change and approve the pull requests quickly without
needing to clarify details.

Most of the pair programming sessions were conducted through Microsoft Teams and outside works hours, Google Meet was used.

### Pull-Requests
We tried to keep pull requests small and easy to understand. Before a pull request can be merged, all comments have to be
resolved and all the pipelines need to pass, which includes automated tests and eslint checks. All pull requests require
two approvals before it can be merged. Any new features that have been developed must have tests associated with it.

## Testing Strategy
The codebase is written using TypeScript, which is a superset of JavaScript. It ensures that the code is type-safe which makes
the code easier to read and reduces errors. It also allows the creation of interfaces to define an entity to which the
rest of the code must adhere to.

For the front-end project, Cypress was chosen for the end-to-end tests. Cypress is an all-in-one end-to-end testing framework
that includes an assertion and mocking/stubbing library that enables developers to create automated tests for web applications.
It has a powerful test runner that allows developers to specify how the components behave. It also includes tools that can
send HTTP requests to an endpoint and assert that components have been rendered on the page. This is a valuable tool that
assures the API and the frontend are integrated together, and assures regressions are not introduced when new features are
developed.

For API testing, there are libraries such as Supertest that allows developers to create integration tests by
running a HTTP request in the code. This works when developing using a test-driven development style as you can set up the
expected results first, and then develop the API to make the tests pass.

To manually test the APIs, this can be done using a popular API testing tool called Postman. It allows testers to send HTTP
requests where you can set headers and parameters for each request. You can group and save requests to run again which will
be useful as there are quite a few API applications in the architecture and being able to test them efficiently is important.

Unit tests are a tried and tested way of ensuring code logic is working as expected. While there are many libraries that can
be used, Jest is a popular and easy library which has a built-in mocking system and test runner. With integration tests
covering the bulk of the tests, unit tests will be used for ensuring certain logic works as it should.

## Test Cases
| No. |                                                    Assumptions                                                     |                            Criteria                             |                                                     Steps                                                     |                                     Expected Results                                      |                                                       Actual Results                                                       | Result |
|:---:|:------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------:|:------:|
|  1  |                                         User is accessing the todo client                                          |     Check the create button works as per the specification      | 1. Open the todo client<br/>2. Enter the title<br/>3. Enter the description<br/>4. Click on the create button | The interface should show a successful feedback and the todo item is rendered on the page | The interface shows the successful feedback and a todo item is rendered on the page with the correct title and description |  Pass  |
|  2  |                           User is accessing the todo client and has existing todo items                            |       Check that the todo items are rendered on page load       |                                            1. Open the todo client                                            |                The interface should show a list of todo items on the page                 |                                         The interface renders a list of todo items                                         |  Pass  |
|  3  |                         User is accessing the todo client and has two existing todo items                          |   Check that the delete button works as per the specification   |                 1. Open the todo client<br/>2. Click on the bin icon for the first todo item                  |                 The interface should show a single todo item on the page                  |                         The interface updates automatically and displays a single item on the page                         |  Pass  |
|  4  |          User is accessing the todo client and has two existing todo items one with the title of "hello"           | Check that the searching feature works as per the specification |                1. Open the todo client<br/>2. Click on the search input<br/>3. Type in "hello"                |              The interface should show the todo item with the "hello" title               |                                  The interface shows the todo item with the "hello" title                                  |  Pass  |
|  5  | User is accessing the todo client and has two existing todo items one with the created date earlier than the other |  Check that the sorting feature works as per the specification  |                    1. Open the todo client<br/>2. Click on the 'Sort by Ascending' button                     |               The interface should show the todo item created earlier first               |                                  The interface shows the todo item created earlier first                                   |  Pass  |

## IEEE Standard
### 4.8 Problem reporting and corrective action (section 8 of the SQAP)
#### a) Describe the practices and procedures to be followed for reporting, tracking, and resolving problems or issues identified in both software items and the software development and maintenance process.
* This project uses GitHub Kanban Board to monitor and track issues.
* All issues are tagged with labels indicating the type of issue.
* Issues can be linked to pull requests; when pull requests are merged, the issue is closed automatically.

![GitHub Issue](./images/github-issue.png)
* Issues can be linked to other issues to manage dependencies between them.
* It also shows if progress is blocked due to other dependencies.
* Visual progress can be seen through commits providing the commit message has the issue number.
* Issues can have a checklist of tasks, which GitHub renders the progress off.

To create an issue, you click on the green "New Issue" button. In the description box, you can type out the details of the
problem or the work that needs to be done. Labels can be optionally provided to describe what the task entails. To pick up an item,
you assign the user to it.

#### b) State the specific organizational responsibilities concerned with their implementation.
The organisation's responsibility is to ensure the application works as expected, and to ensure this, there are checks in place.
For each of the tests in the application, they will be run in an automated way via continuous integration. Since the application code will
be hosted on GitHub, there is the GitHub Actions tool which can be used to run these tests for each pull request. We can
also set restrictions on whether a change can be merged based on whether the test is passing or not. This reduces the chances
of introducing new changes that would break the main branch.

## Performance and Accessibility Audit

![DEV Performance](./images/DEV%20Performance.PNG)
_Development Build_

![PROD Performance](./images/PROD%20Performance.PNG)
_Production Build_

![PROD Performance](./images/Accessibility.PNG)
_Accessibility_

Testing was conducted locally using the Google Lighthouse tool to generate a report 
containing a summary of the quality of our application. Lighthouse is a free and 
open-source tool that can be accessed through the development console for
Chromium-based browsers. The tool was executed twice - one for the development build, and another 
for production. 

In the production build, it revealed a score of 100 in performance and accessibility. 
However, running the same tool on the development build showed a discrepancy in the performance
with a score of 71. A possible reason for this is the production builds are more optimised; 
for example, the build is bundled and minified using Terser, which is a minification tool within Vite
for reducing file sizes. It also does not have any additional scripts such as hot reloading, which has
a websocket connection running in the background to detect changes, and this can impact performance
and time to paint.

Testing was conducted after the core functionalities were implemented.
