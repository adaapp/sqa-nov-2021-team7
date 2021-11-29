import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import DefaultRoute from "./routes/defaultroute";
import TodoRoute from "./routes/todoroute";

const PORT = 8080;
const server = express();

/**
 * Setup middleware
 */
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

/**
 * Setup routes
 */
server.use("/", DefaultRoute);
server.use("/todo", TodoRoute);

if (process.env.NODE_ENV !== "test") {
    server.listen(PORT, () => {
        console.log(`todo-be started on port: http://localhost:${PORT}`);
    });
}

export default server;
