import styled from "styled-components";

import { DeleteButton } from './Button';

type ListItemProps = {
    message: string
}

const Message = styled.div`
    display: inline-block;
    width: calc(100% - 20px);
`;

const ListItemStyled = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
    box-shadow: 2px 4px 2px #888888;
`;

const ListItem = (props: ListItemProps) => {
    return (
        <ListItemStyled>
            <Message>{props.message}</Message>
            <DeleteButton onClick={() => console.log('Remove item api call here')} dataTestId={"delete-button"}/>
        </ListItemStyled>
    );
};

export default ListItem;
