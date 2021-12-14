import {useEffect, useState} from 'react';
import { createItem, getItems, deleteItem, updateItem } from "../services/apiservice";
import { Button } from './Button';
import { Input }  from './Input';
import { ErrorResponse, SuccessResponse, TodoItem } from "../types/todo";
import { UpdateData } from '../../../api/src/core/types/todo';

import styled from "styled-components";
import List from "./List";
import { UpdateForm } from './UpdateForm';

const Feedback = styled.div`

`;

function App() {
    const [feedback, setFeedback] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [dateDue, setDateDue] = useState<Date>(new Date());
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [searchResults, setSearchResults] = useState<TodoItem[]>([]);
    const [isAscending, setAscending] = useState<boolean>(true);
    const [selectedTodoData, setSelectedTodoData] = useState<UpdateData>({title: '', description: '', dateDue: new Date().getTime()} as UpdateData);
    const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);

    useEffect(() => {
        getAllTodos();
    }, []);

    useEffect(() => {
        let state;
        if (searchValue) {
            state = sortArray([...searchResults]);
            setSearchResults(state);
        } else {
            state = sortArray([...todos]);
            setTodos(state);
        }
    }, [searchValue, isAscending]);

    useEffect(() => {
        const state = todos.filter((item) => {
            return item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.description?.toLowerCase().includes(searchValue.toLowerCase());
        });

        setSearchResults(state);
    }, [searchValue]);

    useEffect(() => {
        sortArray(todos);
    }, [todos]);

    const createTodo = async () => {
        const params: TodoItem = {
            title: title,
            description: description,
            dateCreated: new Date().getTime(),
            dateDue: dateDue.getTime(),
            id: ''
        };

        const result = await createItem(params);
        updateFeedback(result);

        if ("data" in result) {
            setTodos([...todos, result.data] as TodoItem[]);
        }
    };

    const deleteTodo = async (id: string) => {
        const result = await deleteItem(id);

        if ("id" in result) {
            setTodos(todos.filter(todo => {
                return todo.id !== result.id;
            }));
        }

        updateFeedback(result);
    };

    const updateTodo = async (updateData: UpdateData) => {
        const result = await updateItem(updateData);

        if ('id' in result) {
            const data = result.data as { updatedTodo: TodoItem };
            const updatedTodo = data.updatedTodo;

            const newList = todos.filter(todo => todo.id !== updatedTodo.id);
            newList.push(updatedTodo);
            setTodos(newList);
        }
        setUpdateFormVisible(false);
        updateFeedback(result);
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

    const onUpdateSelectedTodo = (updateData: UpdateData) => {
        setSelectedTodoData(updateData);
        setUpdateFormVisible(true);
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
            <input
                data-test-id={'date-due-input'}
                type={'datetime-local'}
                onInput={(event) => {
                    const target = event.target as HTMLInputElement;
                    setDateDue(new Date(target.value));
                }}
            />
            <Input
                dataTestId={"search-input"}
                placeholder={"Search items"}
                value={searchValue}
                onInput={(event) => {
                    const target = event.target as HTMLInputElement;
                    setSearchValue(target.value);
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
            <List
                dataTestId={"todo-item-list-container"}
                data={searchValue ? searchResults : todos}
                deleteTodo={deleteTodo}
                updateSelectedTodo={onUpdateSelectedTodo}
            />
            <UpdateForm
                onSubmit={updateTodo}
                updateData={selectedTodoData}
                visible={updateFormVisible}
            />
        </div>
    );
}

export default App;
