import {render, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/components/App";

describe("App component", () => {
    it("renders correctly", async () => {
        const messages = ["Test 1", "Test 2"];

        const { getByText } = render(<App message={messages}/>);

        await waitFor(() => {
            for (const message of messages) {
                expect(getByText(message)).toBeInTheDocument();
            }
        });
    });
});
