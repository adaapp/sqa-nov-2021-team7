import express, { Request, Response } from "express";
import { addTodo, clearTodoItems, getTodoItems, removeSingleItem } from "../core/todorepository";
import { STATUS } from "../core/httputil";

const router = express.Router();

router.post("/", createTodoItem);
router.get("/", getAllTodoItems);
router.delete("/:id?", removeSingleTodoItem);

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
            res.status(STATUS.BAD_REQUEST).json({
                status: false,
                message: `Item with id ${id} does not exist.`
            });
        }
    }
}

export default router;
