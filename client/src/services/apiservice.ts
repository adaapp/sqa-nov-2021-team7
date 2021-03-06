import axios from 'axios';
import { UpdateData } from '../../../api/src/core/types/todo';
import {ErrorResponse, SuccessResponse, TodoItem} from "../types/todo";

export const OK = 200;
export const BAD_REQUEST = 400;
export const INTERNAL_SERVER_ERROR = 500;

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
        const { todo, status } = response.data;

        if (status) {
            return <SuccessResponse> {
                data: todo,
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

export const updateItem = async (updateData: UpdateData ): Promise<SuccessResponse | ErrorResponse> => {
    const response = await axios.post(BASE_URL + `/todo/${updateData.id}`, updateData);
    const { data, status, statusText } = response;

    if (status === OK) {
        return <SuccessResponse> {
            data: data.updatedTodo,
            message: 'Successfully edited an item',
            id: updateData.id
        };
    }
    return <ErrorResponse> {
        error: statusText
    };
};

export const deleteItem = async (id: string): Promise<SuccessResponse | ErrorResponse> => {
    const response = await axios.delete(BASE_URL + `/todo/${id}`);
    const { status, statusText } = response;

    if (status === OK) {
        return <SuccessResponse> {
            message: "Successfully deleted an item.",
            id
        };
    }
    return <ErrorResponse> {
        error: statusText
    };
};

export const getItems = async (): Promise<SuccessResponse | ErrorResponse> => {
    try {
        const response = await axios.get(BASE_URL + `/todo`);
        const { data } = response;

        if (data) {
            return <SuccessResponse> {
                data: data
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
