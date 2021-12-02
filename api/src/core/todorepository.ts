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

const todoCache: TodoItem[] = [];

export function addTodo(item: TodoItem) {
    const canAddToCache = !empty(item.title);
    if (canAddToCache) {
        todoCache.push(item);
    }
    return canAddToCache;
}

export function getTodoItems(): TodoItem[] {
    return todoCache;
}

export function clearTodoItems(): void {
    todoCache.length = 0;
}
