import { useState, useEffect } from 'react';
import { getRootMessage } from "../services/apiservice";

function App() {
    const [message, setMessage] = useState("");

    const getMessage = async () => {
        const message = await getRootMessage() as string;

        setMessage(message);
    };

    useEffect(() => {
        getMessage();
    }, []);

    return (
        <div>
            { message }
        </div>
    );
}

export default App;
