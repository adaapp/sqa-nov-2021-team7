import { v4 as uuid } from "uuid";
import { TodoItem } from "./types/todo";

const EMPTY_LENGTH = 0;

/**
 * A utility function to check if a string it empty or blank.
 * @param val The string to check.
 * @return Boolean if the string is empty or not.
 */
const empty = (val: string): boolean => {
    return !val || val.length === EMPTY_LENGTH;
};

const todoCache: Record<string, TodoItem> = {};

export function addTodo(item: TodoItem): TodoItem | null {
    if (!empty(item.title) || !item.dateCreated) {
        item.id = uuid();
        todoCache[item.id] = item;
        return item;
    }
    return null;
}

export function getTodoItems(): TodoItem[] {
    return Object.values(todoCache);
}

export function clearTodoItems(): void {
    for (const key of Object.getOwnPropertyNames(todoCache)) {
        delete todoCache[key];
    }
}

export function removeSingleItem(id: string): boolean {
    const exists = id in todoCache;
    if (exists) {
        delete todoCache[id];
        return exists;
    }
    return false;
}
