import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/components/App";

describe("App component", () => {

    test("renders correctly", () => {
        const { getByText } = render(<App/>);
        expect(getByText("Hello world")).toBeInTheDocument();
    });
});
