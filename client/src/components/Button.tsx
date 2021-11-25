import {MouseEventHandler} from "react";
import styled from "styled-components";
import imgUrl from '../../binIcon.png';

interface ButtonProps {
    onClick: MouseEventHandler
}

const Input = styled.div`
    height: 20px;
    width: 20px;
    background-image: url(${imgUrl});
    display: inline-block;
    position: absolute;
    background-size: 20px;
`;

const Button = (props: ButtonProps) => {
    return (
        <Input onClick={props.onClick} />
    );
};

export default Button;