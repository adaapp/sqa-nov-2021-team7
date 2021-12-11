import styled from "styled-components";

import { DeleteButton } from './Button';
import { TodoItem } from "../types/todo";

type ListItemProps = {
    dataTestId: string,
    listItem: TodoItem,
    deleteTodo: (id: string) => Promise<void>,
    index: number
}

const Text = styled.div`
    display: inline-block;
    width: calc(100% - 20px);
`;

const ListItemStyled = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin: 15px;
    box-shadow: 2px 4px 2px #888888;
`;

const ListItem = (props: ListItemProps) => {
    const { dataTestId, listItem, deleteTodo, index } = props;

    return (
        <ListItemStyled data-test-id={dataTestId}>
            <Text>{listItem.title}</Text>
            <Text>{listItem.description}</Text>
            <Text>{formatTime(listItem.dateCreated)}</Text>
            <Text>{listItem.dateDue ? formatTime(listItem.dateDue) : ""}</Text>
            <DeleteButton onClick={() => deleteTodo(listItem.id)} dataTestId={"delete-button"} index={index}/>
        </ListItemStyled>
    );
};

const formatTime = (time: number): string => {
    const date = new Date(time);

    return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
};

export default ListItem;
