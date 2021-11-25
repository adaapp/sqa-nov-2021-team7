import { useState, useEffect } from 'react';
import '../styles/App.less'
import { getRootMessage } from "../services/apiservice";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getMessage = async () => {
            const response = await getRootMessage();
            const { data } = response;

            setMessage(data);
        }

        getMessage();
    }, []);

    return (
        <div>
            { message }
        </div>
    )
}

export default App;
