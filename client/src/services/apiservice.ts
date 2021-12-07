import axios from 'axios';
import {ErrorResponse, SuccessResponse, TodoItem} from "../types/todo";

export const OK = 200;
export const BAD_REQUEST = 400;

export const BASE_URL = "http://localhost:8080";

export const getRootMessage = async (): Promise<string | ErrorResponse> => {
    const response = await axios.get(BASE_URL + '/');
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    }
    return <ErrorResponse> {
        error: statusText
    };
};

export const getItem = async (id: string): Promise<TodoItem[] | ErrorResponse> => {
    const response = await axios.get(BASE_URL + `/item/${id}`);
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    }
    return <ErrorResponse> {
        error: statusText
    };
};

export const createItem = async (params: TodoItem): Promise<SuccessResponse | ErrorResponse> => {
    try {
        const response = await axios.post(BASE_URL + `/todo`, params);
        const { status } = response.data;

        if (status) {
            return <SuccessResponse> {
                message: "Successfully created a todo item."
            };
        }
    } catch (exception) {
        const { response } = exception as { response: { data: { message: string }}};

        if (response) {
            const { message } = response.data;

            return <ErrorResponse> {
                error: message
            };
        }
    }

    return <ErrorResponse> {
        error: "Internal server error."
    };
};

export const updateItem = async (id: string, params: Record<string, string> ): Promise<TodoItem[] | ErrorResponse> => {
    const response = await axios.put(BASE_URL + `/item/${id}`, params);
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    }
    return <ErrorResponse> {
        error: statusText
    };
};

export const deleteItem = async (id: string): Promise<SuccessResponse | ErrorResponse> => {
    const response = await axios.delete(BASE_URL + `/item/${id}`);
    const { status, statusText } = response;

    if (status === OK) {
        return <SuccessResponse> {
            message: "Successfully deleted an item."
        };
    }
    return <ErrorResponse> {
        error: statusText
    };
};

export const getItems = async (): Promise<TodoItem[] | ErrorResponse> => {
    const response = await axios.get(BASE_URL + `/items`);
    const { data, status, statusText } = response;

    if (status === OK) {
        return data;
    }
    return <ErrorResponse> {
        error: statusText
    };
};