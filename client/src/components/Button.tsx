import {MouseEventHandler} from "react";
import styled from "styled-components";
import binImgUrl from '../../binIcon.png';
import editImgUrl from '../../editIcon.png';

interface ButtonProps {
    dataTestId: string
    onClick: MouseEventHandler
    value?: string
    index?: number
}

const ButtonContainer = styled.button`
    margin: 5px;
    width: 200px;
`;

const EditIcon = styled.div`
    height: 20px;
    width: 20px;
    background-image: url(${editImgUrl});
    display: inline-block;
    position: relative;
    bottom: 30px;
    background-size: 20px;
`;

const DeleteIcon = styled.div`
    height: 20px;
    width: 20px;
    background-image: url(${binImgUrl});
    display: inline-block;
    position: absolute;
    background-size: 20px;
    right: 20px;
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

export const EditButton = (props: ButtonProps) => {
    const { index, onClick } = props;
    return (
        <EditIcon data-test-id={`${props.dataTestId}-${index}`} onClick={onClick} />
    );
};

export const DeleteButton = (props: ButtonProps) => {
    const { index, onClick } = props;
    return (
        <DeleteIcon data-test-id={`${props.dataTestId}-${index}`} onClick={onClick} />
    );
};
