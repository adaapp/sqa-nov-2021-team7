import express from 'express';
import morgan from 'morgan';

const server = express();
server.use(morgan('dev'));

server.get('/', (request, response) => {
    response.send("Hello World!");
});

server.listen(8080, () => {
    console.log(`todo-be started on port: http://localhost:8080...`);
});