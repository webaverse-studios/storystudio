import React, { useEffect, useState, useCallback } from 'react';
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


export const TextInput = ({text, setText, field})  => {
    const [textInput, setTextInput] = useState(text);
    const onChangeInput = useCallback(
      (e) => {
        setText(e.target.value);
      },
      [textInput]
    );
    console.log(field);
    return (
        field === "description" ? (
            <textarea
                type="text"
                onChange={onChangeInput}
                value={textInput}
          />
        ) : (
            <input
            type="text"
            value={textInput}
            onChange={onChangeInput}
          />
        )
    );
}