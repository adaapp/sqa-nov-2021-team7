import styled from 'styled-components';
import ListItem from "./ListItem";
import { TodoItem } from "../types/todo";
import { UpdateData } from '../../../api/src/core/types/todo';

interface ListProps {
    dataTestId: string,
    data: TodoItem[],
    deleteTodo: (id: string) => Promise<void>,
    updateSelectedTodo: (updateData: UpdateData) => void
}

const ListContainer = styled.div`
    position: relative;
`;

const List = (props: ListProps) => {
    const { dataTestId, data, deleteTodo, updateSelectedTodo } = props;

    return (
        <ListContainer data-test-id={dataTestId}>
            {data.map((item, index) => {
                return <ListItem dataTestId={`todo-item-${index}`} listItem={data[index]} key={index} deleteTodo={deleteTodo} updateSelectedTodo={updateSelectedTodo} index={index}/>;
            })}
        </ListContainer>
    );
};

export default List;