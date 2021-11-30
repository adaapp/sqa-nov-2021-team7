import { TodoItem } from "./types/todo";

const EMPTY_LENGTH = 0;
const empty = (val: string): boolean => !val || val.length === EMPTY_LENGTH;

const todoCache: TodoItem[] = [];

export function addTodo(item: TodoItem) {
    const canAddToCache = !empty(item.title) || !empty(item.title);
    if (canAddToCache) {
        todoCache.push(item);
    }
    return canAddToCache;
}

export function getTodoItems(): TodoItem[] {
    return todoCache;
}
