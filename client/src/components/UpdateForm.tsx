import { useState } from 'react';
import styled from 'styled-components';
import { UpdateData } from '../../../api/src/core/types/todo';
import { Input } from './Input';

type UpdateFormProps = {
    onSubmit: (updateData: UpdateData) => void,
    updateData: UpdateData,
    visible: boolean
}

const FormContainer = styled.div`
    position: fixed;
    background: #00000050;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

export const UpdateForm = (props: UpdateFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dateDue, setDateDue] = useState<number>(Date.now());

    const { onSubmit, updateData, visible } = props;

    const onSubmitClick = () => {
        onSubmit({title, description, dateDue, id: updateData.id} as UpdateData);
        setTitle('');
        setDescription('');
        setDateDue(0);
    };

    return (
        <div style={{display: visible ? 'block' : 'none'}}>
            <FormContainer>
                <Input
                    placeholder={'Title'}
                    dataTestId={'update-title'}
                    value={title}
                    onInput={event => {
                        const target = event.target as HTMLInputElement;
                        setTitle(target.value);
                    }}
                />

                <Input
                    placeholder={'Description'}
                    dataTestId={'update-description'}
                    value={description}
                    onInput={event => {
                        const target = event.target as HTMLInputElement;
                        setDescription(target.value);
                    }}
                />

                <input
                    type={'datetime-local'}
                    data-test-id={'update-date-due'}
                    onChange={event => {
                        const target = event.target as HTMLInputElement;
                        setDateDue(new Date(target.value).getTime());
                    }}
                />

                <button data-test-id={'update-submit'} onClick={() => onSubmitClick()}></button>
            </FormContainer>
        </div>
    );
};