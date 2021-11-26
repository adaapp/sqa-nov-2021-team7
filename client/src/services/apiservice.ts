import axios from 'axios';
import {ErrorResponse, SuccessResponse, TodoItem} from "../types/todo";

export const OK: number = 200;
export const BAD_REQUEST: number = 400;

export const BASE_URL = "http://localhost:8080";

export const getRootMessage = async (): Promise<string | ErrorResponse> => {
    const response = await axios.get(BASE_URL + '/');
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    } else {
        return <ErrorResponse> {
            error: statusText
        }
    }
}

export const getItem = async (id: string): Promise<TodoItem[] | ErrorResponse> => {
    const response = await axios.get(BASE_URL + `/item/${id}`);
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    } else {
        return <ErrorResponse> {
            error: statusText
        }
    }
}

export const createItem = async (params: Record<string, string> ): Promise<SuccessResponse | ErrorResponse> => {
    const response = await axios.post(BASE_URL + `/item`, params);
    const { status, statusText } = response;

    if (status === OK) {
        return <SuccessResponse> {
            message: "Successfully created a todo item."
        }
    } else {
        return <ErrorResponse> {
            error: statusText
        }
    }
}

export const updateItem = async (id: string, params: Record<string, string> ): Promise<TodoItem[] | ErrorResponse> => {
    const response = await axios.put(BASE_URL + `/item/${id}`, params);
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    } else {
        return <ErrorResponse> {
            error: statusText
        }
    }
}

export const deleteItem = async (id: string): Promise<SuccessResponse | ErrorResponse> => {
    const response = await axios.delete(BASE_URL + `/item/${id}`);
    const { status, statusText } = response;

    if (status === OK) {
        return <SuccessResponse> {
            message: "Successfully deleted an item."
        }
    } else {
        return <ErrorResponse> {
            error: statusText
        }
    }
}

export const getItems = async (): Promise<TodoItem[] | ErrorResponse> => {
    const response = await axios.get(BASE_URL + `/items`);
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    } else {
        return <ErrorResponse> {
            error: statusText
        }
    }
}