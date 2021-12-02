import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "../src/components/List";
import {TodoItem} from "../src/types/todo";

describe("List", () => {
    it("renders correctly", () => {
        const data: TodoItem[] = [
            { title: "Title 1", description: "Description 1", dateCreated: 1638481494503, dateDue: 1638481506034 },
            { title: "Title 2", description: "Description 2", dateCreated: 1638481592159, dateDue: 1638482265360 }
        ];

        const { getByText } = render(<List dataTestId={"todo-item-list-container"} data={data}/>);

        data.map((item) => {
            const { title, description, dateCreated, dateDue } = item;

            expect(getByText(title)).toBeInTheDocument();
            expect(getByText(description!)).toBeInTheDocument();
            expect(getByText("02/12/2021, 21:46")).toBeInTheDocument();
            expect(getByText("02/12/2021, 21:57")).toBeInTheDocument();
        });
    });
});
