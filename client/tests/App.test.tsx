import App from "../src/components/App";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/utils";
import axios from "axios";
import { OK } from "../src/services/apiservice";

jest.mock("axios");
const mockedAxios = mocked(axios, true);

describe("App component", () => {
    it("renders correctly", async () => {
        // Given
        mockedAxios.get.mockReturnValue({ data: "Hello world", status: OK, statusText: "OK" } as any);

        // When
        const { getByText } = render(<App/>);

        // Then
        await waitFor(() => {
            expect(getByText("Hello world")).toBeInTheDocument();
        });
    });
});
