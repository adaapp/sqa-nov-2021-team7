import express, { Request, Response } from "express";
import { addTodo, getTodoItems } from "../core/todorepository";
import { STATUS } from "../core/httputil";

const router = express.Router();

router.post("/", createTodoItem);
router.get("/", getAllTodoItems);

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

function getAllTodoItems(req: Request, res: Response) {
    res.json(getTodoItems());
}

export default router;
