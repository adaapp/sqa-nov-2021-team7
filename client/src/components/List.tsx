import styled from 'styled-components';

import ListItem from "./ListItem";

interface ListProps {
    listItems: string[]
}

const ListContainer = styled.div`
    position: relative;
`;

const List = (props: ListProps) => {
    return (
        <ListContainer>
            {props.listItems.map((item, index) => {
                return <ListItem message={props.listItems[index]} key={index}/>;
            })}
        </ListContainer>
    );
};

export default List;