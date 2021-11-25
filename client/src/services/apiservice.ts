import axios from 'axios';

export const BASE_URL = "http://localhost:8080";

export interface TodoItem {
    id: string,
    description: string,
    modifiedAt: Date,
    dueDate: Date
}

export const getRootMessage = async (): Promise<any> => {
    const response = await axios.get(BASE_URL + '/');

    return response;
}

export const getItem = async (id: string): Promise<any> => {
    const response = await axios.get(BASE_URL + `/item/${id}`);

    return response;
}

export const createItem = async (data: object): Promise<any> => {
    const response = await axios.post(BASE_URL + `/item`, data);

    return response;
}

export const updateItem = async (id: string, data: object): Promise<any> => {
    const response = await axios.put(BASE_URL + `/item/${id}`, data);

    return response;
}

export const deleteItem = async (id: string): Promise<any> => {
    const response = await axios.delete(BASE_URL + `/item/${id}`);

    return response;
}

export const getItems = async (): Promise<any> => {
    const response = await axios.get(BASE_URL + `/items`);

    return response;
}