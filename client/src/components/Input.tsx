import {KeyboardEventHandler} from "react";
import styled from "styled-components";

interface InputProps {
    dataTestId: string
    placeholder: string
    value: string
    onInput: KeyboardEventHandler
}

const InputField = styled.input`
  width: 200px;
  margin: 5px;
`;

export const Input = (props: InputProps) => {
    return (
        <InputField
            data-test-id={props.dataTestId}
            placeholder={props.placeholder}
            value={props.value}
            onInput={props.onInput}
        />
    );
};