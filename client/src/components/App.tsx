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
            deleteTodo,
            id: ''
        };

        const result = await createItem(params);
        updateFeedback(result);
    };

    const deleteTodo = async (id: string) => {
        const result = await deleteItem(id);
        const state = todos;

        if ("id" in result) {
            const element: TodoItem | undefined = state.find(element => element.id === result.id);
            if (element) {
                state.splice(state.indexOf(element), 1);
                setTodos([...state]);
            }
        }
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
            <List dataTestId={"todo-item-list-container"} data={todos} deleteTodo={deleteTodo}/>
        </div>
    );
}

export default App;
