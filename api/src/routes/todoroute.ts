import express, {Request, Response} from "express";
import {addTodo} from "../core/todorepository";

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
        res.status(400).json({
            status: false,
            message: "Failed to create todo item."
        });
    }
}

export default router;
