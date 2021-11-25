import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "../src/components/List";

describe("List", () => {
    it("renders correctly", () => {
        const messages = ['message 1', "message 2"];

        const { getByText } = render(<List listItems={messages}/>);

        for (const message of messages) {
            expect(getByText(message)).toBeInTheDocument();
        }
    });
});
