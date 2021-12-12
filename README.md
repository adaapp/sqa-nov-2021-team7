# sqa-nov-2021-team7

**Google Meet Link**  
https://meet.google.com/jqg-jvhc-uvk

## The Team
|    Name    | GitHub |
|:----------:|:------:|
| Samuel Crispin - **Developer & Tester** | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/SamCrispin) |
| Hou Fai Man - **Developer & Tester** | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/houfaiman) |
| Saeed Afzal - **Developer & Tester** | [![Foo](https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-16.png)](https://github.com/saeedafzal) |

## About the Project
This repository contains a web application developed using TypeScript that enables users to create, read, update and delete
todo items. It is a full-stack project that contains a frontend written in the [React](https://reactjs.org/) framework and 
is powered by a backend server using the [Express](http://expressjs.com/) framework.

Data is persisted in-memory as a cache. It does not have a database connection, however discussions were made
about the potential solutions in the future such as MongoDB. This means that any data that was created
during the server's uptime will be lost when the server is shut down or restarted.

## Features
- Create, Read, Update, and Delete
- Searching
- Sorting

## Roadmap
- Prioritisation
  - Sorting
- MongoDB Integration
- Subtasks
- Accounts
- Locations
- Notifications

## Dependencies
The project uses the following dependencies to build and test the application:
- [Vite](https://vitejs.dev/) (Frontend tooling)
- [Express](https://expressjs.com/) (Web framework for Node.js)
- [React](https://reactjs.org/) (JavaScript library for building user interfaces)
- [Eslint](https://eslint.org/) (JavaScript linter)
- [Styled Components](https://styled-components.com/) (Inline styling for React components)
- [Axios](https://axios-http.com/) (Promise-based HTTP client)
- [Jest](https://jestjs.io/) (JavaScript testing framework)
- [Cypress](https://www.cypress.io/) (End-to-End testing framework)

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

## Running tests

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