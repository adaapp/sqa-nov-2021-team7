import {MouseEventHandler} from "react";
import styled from "styled-components";
import imgUrl from '../../binIcon.png';

interface ButtonProps {
    dataTestId: string
    onClick: MouseEventHandler
    value?: string
}

const DeleteIcon = styled.div`
    height: 20px;
    width: 20px;
    background-image: url(${imgUrl});
    display: inline-block;
    position: absolute;
    background-size: 20px;
`;

const Button = styled.button`
  margin: 5px;
  width: 200px;
`;

export const CreateButton = (props: ButtonProps) => {
    return (
        <Button
            data-test-id={props.dataTestId}
            onClick={props.onClick}
        >
            {props.value}
        </Button>
    );
};

export const DeleteButton = (props: ButtonProps) => {
    return (
        <DeleteIcon onClick={props.onClick} />
    );
};
