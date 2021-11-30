import { useState, useEffect } from 'react';
import { createItem, getRootMessage } from "../services/apiservice";
import { CreateButton } from '../components/Button';
import { Input }  from '../components/Input';
import styled from "styled-components";

const Feedback = styled.div`

`;

function App() {
    const [feedback, setFeedback] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const createTodo = async () => {
        const params: Record<String, String> = {
            title: title,
            description: description,
            dateCreated: new Date().getTime(),
            dateDue: new Date().getTime()
        }

        const result = await createItem(params);

        if ("message" in result) {
            setFeedback(result.message);
        } else {
            setFeedback(result.error);
        }
    }

    return (
        <div>
            <Input
                dataTestId={"title-input"}
                placeholder={"Title"}
                value={title}
                onInput={(event) => setTitle(event.target.value)}
            />
            <Input
                dataTestId={"description-input"}
                placeholder={"Description"}
                value={description}
                onInput={(event) => setDescription(event.target.value)}
            />
            <CreateButton
                dataTestId={"create-button"}
                value={"Create"}
                onClick={(event) => createTodo()}
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
