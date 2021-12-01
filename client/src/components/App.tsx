import { useState} from 'react';
import { createItem} from "../services/apiservice";
import { CreateButton } from './Button';
import { Input }  from './Input';
import { TodoItem } from "../types/todo";

import styled from "styled-components";

const Feedback = styled.div`

`;

function App() {
    const [feedback, setFeedback] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const createTodo = async () => {
        const params: TodoItem = {
            title: title,
            description: description,
            dateCreated: new Date(),
            dateDue: new Date()
        };

        const result = await createItem(params);

        if ("message" in result) {
            setFeedback(result.message);
        } else {
            setFeedback(result.error);
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
            <CreateButton
                dataTestId={"create-button"}
                value={"Create"}
                onClick={() => createTodo()}
            />
            <Feedback
                data-test-id={"feedback"}
            >
                { feedback }
            </Feedback>
        </div>
    );
}

export default App;
