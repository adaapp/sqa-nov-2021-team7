import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem from "../src/components/ListItem";
import {TodoItem} from "../src/types/todo";

describe("List", () => {
    it("renders correctly", () => {
        const data: TodoItem = {
            title: "Title",
            description: "Description",
            dateCreated: 1638481494503,
            dateDue: 1638481506034
        }

        const { getByText } = render(<ListItem dataTestId={"todo-item-1"} listItem={data}/>);

        expect(getByText(data.title)).toBeInTheDocument();
        expect(getByText(data.description!)).toBeInTheDocument();
        expect(getByText(data.dateCreated)).toBeInTheDocument();
        expect(getByText(data.dateDue!)).toBeInTheDocument();
    });
});
