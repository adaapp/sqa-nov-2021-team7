import {
    BASE_URL,
    OK,
    BAD_REQUEST,
    createItem,
    deleteItem,
    getItem,
    getItems,
    getRootMessage,
    updateItem
} from "../../src/services/apiservice";
import {ErrorResponse, SuccessResponse, TodoItem} from "../../src/types/todo";
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock("axios");
const mockedAxios = mocked(axios, true);

describe("apiservice", () => {
    describe("getRootMessage", () => {
        it("should successfully return a string message", async () => {
            // Given
            const expectedResult: string = "Message";
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK, statusText: "OK" });

            // When
            const result = await getRootMessage() as string;

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/`);
            expect(result).toBe(expectedResult);
        });
    });

    describe("getItem", () => {
        it("should successfully return a list with a single object", async () => {
            // Given
            const id: string = "0";
            const expectedResult: TodoItem[] = [
                {id: "0", description: "To-do item", modifiedAt: new Date(), dueDate: new Date()}
            ];
            mockedAxios.get.mockResolvedValue({data: expectedResult, status: OK, statusText: "OK"});

            // When
            const result = await getItem(id) as TodoItem[];

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result).toBe(expectedResult);
            expect(result.length).toBe(1);
        });

        it("should return an error response if item does not exist.", async () => {
            // Given
            const id: string = "0";
            const expectedResult: string = "Failed to retrieve item; item does not exist.";
            mockedAxios.get.mockResolvedValue({ data: null, status: BAD_REQUEST, statusText: expectedResult});

            // When
            const result = await getItem(id) as ErrorResponse;

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result.error).toBe(expectedResult);
        });
    });

    describe("createItem", () => {
        it("should successfully create a todo item", async () => {
            // Given
            const data: Record<string, string> = {
                description: "Description"
            }
            const expectedResult: string = "Successfully created a todo item.";
            mockedAxios.post.mockResolvedValue({ data: null, status: OK, statusText: "OK" });

            // When
            const result = await createItem(data) as SuccessResponse;

            // Then
            expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL + `/item`, data);
            expect(result.message).toBe(expectedResult);
        });

        it("should return an error message if item cannot be created.", async () => {
            // Given
            const data: Record<string, string>  = {
                description: "Description"
            }
            const expectedResult: string = "Failed to create an item.";
            mockedAxios.post.mockResolvedValue({ data: null, status: BAD_REQUEST, statusText: expectedResult });

            // When
            const result = await createItem(data) as ErrorResponse;

            // Then
            expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL + `/item`, data);
            expect(result.error).toBe(expectedResult);
        });
    });

    describe("updateItem", () => {
        it("should successfully update an existing todo item", async () => {
            // Given
            const id: string = "0"
            const data: Record<string, string>  = {
                description: "Updated description"
            }
            const expectedResult: TodoItem[] = [
                { id: "0", description: "Updated description", modifiedAt: new Date(), dueDate: new Date() }
            ];
            mockedAxios.put.mockResolvedValue({ data: expectedResult, status: OK, statusText: "OK" });

            // When
            const result = await updateItem(id, data) as TodoItem[];

            // Then
            expect(mockedAxios.put).toHaveBeenCalledWith(BASE_URL + `/item/${id}`, data);
            expect(result).toBe(expectedResult);
            expect(result.length).toBe(1);
        });

        it("should return an error message if item cannot be updated.", async () => {
            // Given
            const id: string = "0"
            const data: Record<string, string>  = {
                description: "Updated description"
            }
            const expectedResult: string = "Failed to update an item; item does not exist.";
            mockedAxios.put.mockResolvedValue({ data: null, status: BAD_REQUEST, statusText: expectedResult });

            // When
            const result = await updateItem(id, data) as ErrorResponse;

            // Then
            expect(mockedAxios.put).toHaveBeenCalledWith(BASE_URL + `/item/${id}`, data);
            expect(result.error).toBe(expectedResult);
        });
    });

    describe("deleteItem", () => {
        it("should successfully delete a todo item", async () => {
            // Given
            const id: string = "0";
            const expectedResult: string = "Successfully deleted an item.";
            mockedAxios.delete.mockResolvedValue({ status: OK, statusText: "OK" });

            // When
            const result = await deleteItem(id) as SuccessResponse;

            // Then
            expect(mockedAxios.delete).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result.message).toBe(expectedResult);
        });

        it("should return an error if item cannot be deleted", async () => {
            // Given
            const id: string = "0";
            const expectedResult: string = "Failed to delete an item; item does not exist.";
            mockedAxios.delete.mockResolvedValue({ data: null, status: BAD_REQUEST, statusText: expectedResult });

            // When
            const result = await deleteItem(id) as ErrorResponse;

            // Then
            expect(mockedAxios.delete).toHaveBeenCalledWith(BASE_URL + `/item/${id}`);
            expect(result.error).toBe(expectedResult);
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
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK, statusText: "OK" });

            // When
            const result = await getItems() as TodoItem[];

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/items`);
            expect(result.length).toBe(3);
            expect(result).toEqual(expectedResult);
        });

        it("should return an empty array of todo items if call was successful.", async () => {
            // Given
            const expectedResult: TodoItem[] = [];
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK, statusText: "OK" });

            // When
            const result = await getItems() as TodoItem[];

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/items`);
            expect(result).toBe(expectedResult);
        });

        it("should return an error if unable to retrieve items", async () => {
            // Given
            const expectedResult: string = "Failed to retrieve a list of items."
            mockedAxios.get.mockResolvedValue({ data: null, status: BAD_REQUEST, statusText: expectedResult });

            // When
            const result = await getItems() as ErrorResponse;

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/items`);
            expect(result.error).toBe(expectedResult);
        });
    });
});