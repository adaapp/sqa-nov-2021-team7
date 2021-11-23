import config from "./core/config.js";
import express from 'express';
import morgan from 'morgan';

const server = express();
server.use(morgan('dev'));

server.get('/', (request, response) => {
    response.send("Hello World!");
});

server.listen(config.port || 8080, () => {
    console.log(`[${config.env}] todo-be started on port: http://localhost:${config.port || 8080}...`);
});