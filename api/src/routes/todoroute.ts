import express, {Request, Response} from "express";
import {addTodo} from "../core/todorepository";
import {STATUS} from "../core/httputil";

const router = express.Router();

router.post("/", createTodoItem);

function createTodoItem(req: Request, res: Response) {
    const request = req.body;
    console.debug(request);

    const result = addTodo(request);
    if (result) {
        res.json({
            status: true
        });
    } else {
        res.status(STATUS.BAD_REQUEST).json({
            status: false,
            message: "Failed to create todo item."
        });
    }
}

export default router;
