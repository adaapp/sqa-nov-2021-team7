import express, { Request, Response } from "express";
import { ERROR_RESPONSE, STATUS } from "../core/httputil";
import {
    addTodo,
    clearTodoItems,
    getTodoItems,
    removeSingleItem,
    todoItemExists,
    updateSingleTodoItem
} from "../core/todorepository";

const router = express.Router();

router.post("/", createTodoItem);
router.get("/", getAllTodoItems);
router.delete("/:id?", removeSingleTodoItem);
router.post("/:id", updateTodoItem);

function createTodoItem(req: Request, res: Response) {
    const request = req.body;

    const todo = addTodo(request);
    if (todo) {
        res.json({
            status: true,
            todo: todo
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

function removeSingleTodoItem(req: Request, res: Response) {
    const id: string = req.params.id;
    if (!id) {
        clearTodoItems();
        res.json({
            status: true
        });
    } else {
        if (removeSingleItem(id)) {
            res.json({
                status: true,
                id: id
            });
        } else {
            ERROR_RESPONSE(res, `Item with id ${id} does not exist.`);
        }
    }
}

function updateTodoItem(req: Request, res: Response) {
    const id: string = req.params.id;
    const request = req.body;

    if (todoItemExists(id)) {
        updateSingleTodoItem(id, request);
        res.json({
            status: true
        });
    } else {
        ERROR_RESPONSE(res, `Item with id ${id} does not exist.`);
    }
}

export default router;
