import {useEffect, useState} from 'react';
import { createItem, getItems, deleteItem } from "../services/apiservice";
import { Button } from './Button';
import { Input }  from './Input';
import {ErrorResponse, SuccessResponse, TodoItem} from "../types/todo";

import styled from "styled-components";
import List from "./List";

const Feedback = styled.div`

`;

function App() {
    const [feedback, setFeedback] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [todos, setTodos] = useState<TodoItem[]>([]);

    useEffect(() => {
        getAllTodos();
    }, []);

    const createTodo = async () => {
        const params: TodoItem = {
            title: title,
            description: description,
            dateCreated: new Date().getTime(),
            dateDue: new Date().getTime(),
            id: ''
        };

        const result = await createItem(params);
        updateFeedback(result);
    };

    const getAllTodos = async () => {
        const result = await getItems();

        if ("data" in result) {
            setTodos(result.data as TodoItem[]);
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

    const deleteItem = () => {

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
