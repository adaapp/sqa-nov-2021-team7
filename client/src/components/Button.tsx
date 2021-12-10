import {MouseEventHandler} from "react";
import styled from "styled-components";
import imgUrl from '../../binIcon.png';

interface ButtonProps {
    dataTestId: string
    onClick: MouseEventHandler
    value?: string
    index?: number
}

const DeleteIcon = styled.div`
    height: 20px;
    width: 20px;
    background-image: url(${imgUrl});
    display: inline-block;
    position: absolute;
    background-size: 20px;
`;

const ButtonContainer = styled.button`
  margin: 5px;
  width: 200px;
`;

export const Button = (props: ButtonProps) => {
    return (
        <ButtonContainer
            data-test-id={props.dataTestId}
            onClick={props.onClick}
        >
            {props.value}
        </ButtonContainer>
    );
};

export const DeleteButton = (props: ButtonProps) => {
    const { index, onClick } = props;
    return (
        <DeleteIcon data-test-id={`${props.dataTestId}-${index}`} onClick={onClick} />
    );
};
