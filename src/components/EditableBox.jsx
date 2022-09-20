import React, { useEffect } from 'react';
import '../styles/App.css';

export const EditableBox = ({text, setText, saveInterval = 20}) => {
    const [count, setCount] = React.useState(0);
    useEffect(() => {
        const text = localStorage.getItem('text');
        if (text) {
            setText(text);
        }
    }, []);

    useEffect(() => {
        if (count > saveInterval) {
            localStorage.setItem('text', text);
            setCount(0);
        } else {
            setCount(count + 1);
        }
    }, [text]);

    return (
        <textarea value={text} onChange={(e) => setText(e.target.value)} onFocus={(e) => setText(e.target.value)} />
    );
}