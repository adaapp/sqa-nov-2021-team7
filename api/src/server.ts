import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import DefaultRoute from "./routes/defaultroute";

const PORT = 8080;
const server = express();

/**
 * Setup middleware
 */
server.use(morgan('dev'));
server.use(cors());

/**
 * Setup routes
 */
server.use("/", DefaultRoute);

server.listen(PORT, () => {
    console.log(`todo-be started on port: http://localhost:${PORT}`);
});

export default server;
