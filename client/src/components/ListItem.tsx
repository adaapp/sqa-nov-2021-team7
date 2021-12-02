import styled from "styled-components";

import { DeleteButton } from './Button';
import {TodoItem} from "../types/todo";

type ListItemProps = {
    dataTestId: string,
    listItem: TodoItem
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
    const { dataTestId, listItem } = props;

    return (
        <ListItemStyled data-test-id={dataTestId}>
            <Text>{listItem.title}</Text>
            <Text>{listItem.description}</Text>
            <Text>{listItem.dateCreated}</Text>
            <Text>{listItem.dateDue}</Text>
            <DeleteButton onClick={() => console.log('Remove item api call here')} dataTestId={"delete-button"}/>
        </ListItemStyled>
    );
};

export default ListItem;
