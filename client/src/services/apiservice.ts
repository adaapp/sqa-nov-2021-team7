import axios from 'axios';

export const BASE_URL = "http://localhost:8080";

export const getRootMessage = async (): Promise<string> => {
    const response = await axios.get(BASE_URL + '/');

    return response.data;
}