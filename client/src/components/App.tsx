import List from "./List";

interface AppProps {
    message?: string[]
}

const App = (props: AppProps) => {
    const message: string[] = props.message || ["Lorem ipsum"];
    return (
        <div>
            <List listItems={message} />
        </div>
    );
};

export default App;
