import {
    BASE_URL,
    OK,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
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
            const expectedResult = "Message";
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
            const id = "0";
            const expectedResult: TodoItem[] = [
                { title: "0", description: "To-do item", dateCreated: new Date().getTime(), dateDue: new Date().getTime(), id: '12345'}
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
            const id = "0";
            const expectedResult = "Failed to retrieve item; item does not exist.";
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
            const data: TodoItem = {
                title: "Title",
                description: "Description",
                dateCreated: new Date().getTime(),
                id: '12345'
            };
            const expectedResult = "Successfully created a todo item.";
            mockedAxios.post.mockResolvedValue({ data: { status: true }, status: OK });

            // When
            const result = await createItem(data) as SuccessResponse;

            // Then
            expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL + `/todo`, data);
            expect(result.message).toBe(expectedResult);
        });

        it("should return an error message if item cannot be created.", async () => {
            // Given
            const data: TodoItem = {
                title: "Title",
                description: "Description",
                dateCreated: new Date().getTime(),
                id: '12345'
            };
            const expectedResult = "Failed to create todo item.";
            mockedAxios.post.mockImplementation(() => {
                throw {
                    response: {
                        data: {
                            status: false,
                            message: expectedResult
                        }
                    }
                };
            });

            // When
            const result = await createItem(data) as ErrorResponse;

            // Then
            expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL + `/todo`, data);
            expect(result.error).toBe(expectedResult);
        });
    });

    describe("updateItem", () => {
        it("should successfully update an existing todo item", async () => {
            // Given
            const id = "0";
            const data: Record<string, string>  = {
                description: "Updated description"
            };
            const expectedResult: TodoItem[] = [
                { title: "0", description: "Updated description", dateCreated: new Date().getTime(), dateDue: new Date().getTime(), id: '12345' }
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
            const id = "0";
            const data: Record<string, string>  = {
                description: "Updated description"
            };
            const expectedResult = "Failed to update an item; item does not exist.";
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
            const id = "0";
            const expectedResult = "Successfully deleted an item.";
            mockedAxios.delete.mockResolvedValue({ status: OK, statusText: "OK" });

            // When
            const result = await deleteItem(id) as SuccessResponse;

            // Then
            expect(mockedAxios.delete).toHaveBeenCalledWith(BASE_URL + `/todo/${id}`);
            expect(result.message).toBe(expectedResult);
        });

        it("should return an error if item cannot be deleted", async () => {
            // Given
            const id = "0";
            const expectedResult = "Failed to delete an item; item does not exist.";
            mockedAxios.delete.mockResolvedValue({ data: null, status: BAD_REQUEST, statusText: expectedResult });

            // When
            const result = await deleteItem(id) as ErrorResponse;

            // Then
            expect(mockedAxios.delete).toHaveBeenCalledWith(BASE_URL + `/todo/${id}`);
            expect(result.error).toBe(expectedResult);
        });
    });

    describe("getItems", () => {
        it("should successfully retrieve a list of todo items", async () => {
            // Given
            const expectedResult: TodoItem[] = [
                { title: "0", description: "Description 0", dateCreated: new Date().getTime(), dateDue: new Date().getTime(), id: '12345' },
                { title: "1", description: "Description 1", dateCreated: new Date().getTime(), dateDue: new Date().getTime(), id: '12345' },
                { title: "2", description: "Description 2", dateCreated: new Date().getTime(), dateDue: new Date().getTime(), id: '12345' }
            ];
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK, statusText: "OK" });

            // When
            const result = await getItems() as SuccessResponse;

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/todo`);
            expect(Array.isArray(result.data)).toBeTruthy();
            expect((result.data as TodoItem[]).length).toBe(3);
            expect(result.data).toEqual(expectedResult);
        });

        it("should return an empty array of todo items if call was successful.", async () => {
            // Given
            const expectedResult: TodoItem[] = [];
            mockedAxios.get.mockResolvedValue({ data: expectedResult, status: OK, statusText: "OK" });

            // When
            const result = await getItems() as SuccessResponse;

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/todo`);
            expect(result.data).toBe(expectedResult);
        });

        it("should return an error if server is down or unavailable", async () => {
            // Given
            const expectedResult = "Internal server error.";
            mockedAxios.get.mockResolvedValue({ status: INTERNAL_SERVER_ERROR, statusText: expectedResult });

            // When
            const result = await getItems() as ErrorResponse;

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + `/todo`);
            expect(result.error).toBe(expectedResult);
        });
    });
});
