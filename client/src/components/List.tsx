import styled from 'styled-components';

import ListItem from "./ListItem";

interface ListProps {
    listItems: string[]
}

const ListContainer = styled.div`
    position: relative;
`

const List = (props: ListProps) => {
    const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu"
    return (
        <ListContainer>
            {props.listItems.map((item, index) => {
                return <ListItem message={message} key={index}/>
            })}
        </ListContainer>
    )
}

export default List;