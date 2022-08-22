import React, { useEffect } from 'react';
import './App.css';

export const EditableBox = ({header, text, setText, saveInterval = 20}) => {
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
        <div>
            <h1>{header}</h1>
            <textarea value={text} onChange={(e) => setText(e.target.value)} onfocusout={(e) => setText(e.target.value)} />
        </div>
    );
}