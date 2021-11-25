import App from "../src/components/App";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/utils";
import axios from "axios";

jest.mock("axios");
const mockedAxios = mocked(axios, true);

describe("App component", () => {
    it("renders correctly", async () => {
        // Given
        mockedAxios.get.mockReturnValue({ data: "Hello world" } as any);

        // When
        const { getByText } = render(<App/>);

        // Then
        await waitFor(() => {
            expect(getByText("Hello world")).toBeInTheDocument();
        });
    });
});
