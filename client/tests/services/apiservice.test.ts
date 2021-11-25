import axios from 'axios';
import {
    BASE_URL,
    TodoItem,
    createItem,
    deleteItem,
    getItem,
    getItems,
    getRootMessage,
    updateItem
} from "../../src/services/apiservice";
import { mocked } from 'ts-jest/utils';

jest.mock("axios");
const mockedAxios = mocked(axios, true);

const OK: number = 200;
const BAD_REQUEST: number = 400;

describe("apiservice", () => {
    describe("getRootMessage", () => {
        it("should successfully return a string message", async () => {
            // Given
            const expectedResult: string = "Message";
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK });

            // When
            const result = await getRootMessage();

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/`);
            expect(result.data).toBe("Message");
        });
    });

    describe("getItem", () => {
        it("should successfully return a list with a single object", async () => {
            // Given
            const id = "0";
            const expectedResult: TodoItem[] = [
                { id: "0", description: "To-do item", modifiedAt: new Date(), dueDate: new Date() }
            ];
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK });

            // When
            const result = await getItem(id);

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result.data).toBe(expectedResult);
            expect(result.data.length).toBe(1);
        });

        it("should return null data and BAD_REQUEST status", async () => {
            // Given
            const id = "0";
            mockedAxios.get.mockResolvedValue({ data: null, status: BAD_REQUEST });

            // When
            const result = await getItem(id);

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result.data).toBe(null);
            expect(result.status).toBe(BAD_REQUEST);
        });
    });

    describe("createItem", () => {
        it("should successfully create a todo item", async () => {
            // Given
            const data: object = {
                description: "Description"
            }
            mockedAxios.post.mockResolvedValue({ data: null, status: OK });

            // When
            const result = await createItem(data);

            // Then
            expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL + `/item`, data);
            expect(result.data).toBe(null);
            expect(result.status).toBe(OK);
        });

        it("should return null data and BAD_REQUEST status", async () => {
            // Given
            const data: object = {
                description: "Description"
            }
            mockedAxios.post.mockResolvedValue({ data: null, status: BAD_REQUEST });

            // When
            const result = await createItem(data);

            // Then
            expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL + `/item`, data);
            expect(result.data).toBe(null);
            expect(result.status).toBe(BAD_REQUEST);
        });
    });

    describe("updateItem", () => {
        it("should successfully update an existing todo item", async () => {
            // Given
            const id = "0"
            const data: object = {
                description: "Updated description"
            }
            const expectedResult: TodoItem[] = [
                { id: "0", description: "Updated description", modifiedAt: new Date(), dueDate: new Date() }
            ];
            mockedAxios.put.mockResolvedValue({ data: expectedResult, status: OK });

            // When
            const result = await updateItem(id, data);

            // Then
            expect(mockedAxios.put).toHaveBeenCalledWith(BASE_URL + `/item/${id}`, data);
            expect(result.data).toBe(expectedResult);
        });

        it("should return null data and BAD_REQUEST status", async () => {
            // Given
            const id = "0"
            const data: object = {
                description: "Updated description"
            }
            mockedAxios.put.mockResolvedValue({ data: null, status: BAD_REQUEST });

            // When
            const result = await updateItem(id, data);

            // Then
            expect(mockedAxios.put).toHaveBeenCalledWith(BASE_URL + `/item/${id}`, data);
            expect(result.data).toBe(null);
            expect(result.status).toBe(BAD_REQUEST);
        });
    });

    describe("deleteItem", () => {
        it("should successfully delete a todo item", async () => {
            // Given
            const id = "0"
            mockedAxios.delete.mockResolvedValue({ status: OK });

            // When
            const result = await deleteItem(id);

            // Then
            expect(mockedAxios.delete).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result.status).toBe(OK);
        });

        it("should return null data and BAD_REQUEST status", async () => {
            // Given
            const id = "0"
            mockedAxios.delete.mockResolvedValue({ data: null, status: BAD_REQUEST });

            // When
            const result = await deleteItem(id);

            // Then
            expect(mockedAxios.delete).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result.status).toBe(BAD_REQUEST);
        });
    });

    describe("getItems", () => {
        it("should successfully retrieve a list of todo items", async () => {
            // Given
            const expectedResult: TodoItem[] = [
                { id: "0", description: "Description 0", modifiedAt: new Date(), dueDate: new Date() },
                { id: "1", description: "Description 1", modifiedAt: new Date(), dueDate: new Date() },
                { id: "2", description: "Description 2", modifiedAt: new Date(), dueDate: new Date() }
            ]
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK });

            // When
            const result = await getItems();

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/items`);
            expect(result.data.length).toBe(3)

            for (let index = 0; index < result.length; index++) {
                expect(result[index].id).toBe(`${index}`);
                expect(result[index].description).toBe(`Description ${index}`);
            }
        });

        it("should return null data and OK status", async () => {
            // Given
            mockedAxios.get.mockResolvedValue({ data: null, status: OK });

            // When
            const result = await getItems();

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/items`);
            expect(result.data).toBe(null);
            expect(result.status).toBe(OK);
        });
    });
});