import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem from "../src/components/ListItem";

describe("List", () => {
    it("renders correctly", () => {
        const message1 = 'message 1';

        const { getByText } = render(<ListItem message={message1}/>);

        expect(getByText(message1)).toBeInTheDocument();
    });
});
