import { useState, useEffect } from 'react';
import '../styles/App.less'
import { getRootMessage } from "../services/apiservice";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getMessage = async () => {
            const message = await getRootMessage();
            setMessage(message);
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
