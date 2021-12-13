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
    const [dateDue, setDateDue] = useState<Date>(new Date);

    const { onSubmit, updateData, visible } = props;

    //yyyy-MM-ddThh:mm
    const formatDate = (date: Date) => {
        // return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}`;
        return date.toISOString().slice(0, date.toISOString().length - 1);
    };

    return (
        <div style={{display: visible ? 'block' : 'none'}}>
            <FormContainer>
                <Input
                    placeholder={'Title'}
                    dataTestId={''}
                    value={updateData.title}
                    onInput={event => {
                        const target = event.target as HTMLInputElement;
                        setTitle(target.value);
                    }}
                />

                <Input
                    placeholder={'Description'}
                    dataTestId={''}
                    value={updateData.description}
                    onInput={event => {
                        const target = event.target as HTMLInputElement;
                        setDescription(target.value);
                    }}
                />

                <input
                    type={'datetime-local'}
                    value={formatDate(dateDue)}
                    onChange={event => {
                        const target = event.target as HTMLInputElement;
                        setDateDue(new Date(target.value));
                    }}
                />

                <button onClick={() => onSubmit({title, description, dateDue, id: updateData.id} as UpdateData)}></button>
            </FormContainer>
        </div>
    );
};