import { useEffect, useState } from 'react';
import { createItem, getItems} from "../services/apiservice";
import { Button } from './Button';
import { Input }  from './Input';
import { ErrorResponse, SuccessResponse, TodoItem } from "../types/todo";

import styled from "styled-components";
import List from "./List";

const Feedback = styled.div`

`;

function App() {
    const [feedback, setFeedback] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [isAscending, setAscending] = useState<boolean>(true);

    useEffect(() => {
        getAllTodos();
    }, []);

    useEffect(() => {
        const state = sortArray([...todos]);

        setTodos(state);
    }, [isAscending]);

    const createTodo = async () => {
        const params: TodoItem = {
            title: title,
            description: description,
            dateCreated: new Date().getTime(),
            dateDue: new Date().getTime()
        };

        const result = await createItem(params);
        updateFeedback(result);

        if ("data" in result) {
            setTodos([...todos, result.data] as TodoItem[]);
        }
    };

    const getAllTodos = async () => {
        const result = await getItems();

        if ("data" in result) {
            setTodos(sortArray(result.data as TodoItem[]));
        }
    };

    const updateFeedback = (result: SuccessResponse | ErrorResponse) => {
        const successResponse = result as SuccessResponse;
        const errorResponse = result as ErrorResponse;

        if (successResponse.message) {
            setFeedback(successResponse.message);
        } else if (errorResponse.error) {
            setFeedback(errorResponse.error);
        }
    };

    const sortArray = (array: TodoItem[]) => {
        return array.sort((itemOne, itemTwo) => {
            return isAscending ? itemOne.dateCreated - itemTwo.dateCreated : itemTwo.dateCreated - itemOne.dateCreated;
        });
    };

    return (
        <div>
            <Input
                dataTestId={"title-input"}
                placeholder={"Title"}
                value={title}
                onInput={(event) => {
                    const target = event.target as HTMLInputElement;
                    setTitle(target.value);
                }}
            />
            <Input
                dataTestId={"description-input"}
                placeholder={"Description"}
                value={description}
                onInput={(event) => {
                    const target = event.target as HTMLInputElement;
                    setDescription(target.value);
                }}
            />
            <Button
                dataTestId={"create-button"}
                value={"Create"}
                onClick={() => createTodo()}
            />
            <Button
                dataTestId={"refresh-button"}
                value={"Refresh"}
                onClick={() => getAllTodos()}
            />
            <Button
                dataTestId={`sort-button-${isAscending ? "descending" : "ascending"}`}
                value={isAscending ? "Sort by Descending" : "Sort by Ascending"}
                onClick={() => setAscending(!isAscending)}
            />
            <Feedback
                data-test-id={"feedback"}
            >
                { feedback }
            </Feedback>
            <List dataTestId={"todo-item-list-container"} data={todos}/>
        </div>
    );
}

export default App;
