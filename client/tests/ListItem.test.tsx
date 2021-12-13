import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem from "../src/components/ListItem";
import {TodoItem} from "../src/types/todo";
import jest from 'jest';
import { UpdateData } from "../../api/src/core/types/todo";

describe("List", () => {
    it("renders correctly", () => {
        const mockDelete = (id: string): Promise<void> => {
            throw new Error();
        };

        const mockUpdate = (updateData: UpdateData): void => {
            throw new Error();
        };

        const data: TodoItem = {
            title: "Title",
            description: "Description",
            dateCreated: 1638481494503,
            dateDue: 1638481506034,
            id: '12345'
        };

        const { getByText } = render(<ListItem dataTestId={"todo-item-1"} listItem={data} index={1} deleteTodo={mockDelete} updateSelectedTodo={mockUpdate}/>);

        expect(getByText(data.title)).toBeInTheDocument();
        expect(getByText(data.description!)).toBeInTheDocument();
        expect(getByText("02/12/2021, 21:44")).toBeInTheDocument();
        expect(getByText("02/12/2021, 21:45")).toBeInTheDocument();
    });
});
