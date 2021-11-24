import express from 'express';
import morgan from 'morgan';
import DefaultRoute from "./routes/defaultroute";

const PORT = 8080;
const server = express();

/**
 * Setup middleware
 */
server.use(morgan('dev'));

/**
 * Setup routes
 */
server.use("/", DefaultRoute);

server.listen(PORT, () => {
    console.log(`todo-be started on port: ${PORT}`);
});

export default server;
