import axios from 'axios';
import { BASE_URL, getRootMessage } from "../../src/services/apiservice";
import { mocked } from 'ts-jest/utils';

jest.mock("axios");
const mockedAxios = mocked(axios, true);

describe("apiservice", () => {
    describe("getRootMessage", () => {
        it("should return a string message", async () => {
            // Given
            const expectedResult: string = "Message";
            mockedAxios.get.mockResolvedValue({ data: expectedResult });

            // When
            const result = await getRootMessage();

            // Then
            expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL + '/');
            expect(result).toBe("Message");
        });
    });
});