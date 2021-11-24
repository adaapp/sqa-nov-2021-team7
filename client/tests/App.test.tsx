import App from "../src/components/App";
import { getRootMessage } from "../src/services/apiservice";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../src/services/apiservice");

describe("App component", () => {
    test("renders correctly", () => {
        const mockedGetRootMessage = getRootMessage as jest.MockedFunction<() => Promise<string>>
        mockedGetRootMessage.mockResolvedValue("Hello world");
        const { getByText } = render(<App/>);
        expect(getByText("Hello world")).toBeInTheDocument();
    });
});
