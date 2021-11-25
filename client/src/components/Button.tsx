import {MouseEventHandler} from "react";
import styled from "styled-components";

interface ButtonProps {
    onClick: MouseEventHandler
}

const imgUrl = new URL('../../binIcon.png', import.meta.url).href

const Input = styled.div`
    height: 20px;
    width: 20px;
    background-image: url(${imgUrl});
    display: inline-block;
    position: absolute;
    background-size: 20px;
`

const Button = (props: ButtonProps) => {
    return (
        <Input onClick={props.onClick} />
    )
}

export default Button;