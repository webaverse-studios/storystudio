import React from "react";
import "./App.css"

const ContextGenerator = ({input, generationCallback}) => {
    const [text, setText] = React.useState('');

    return (
        <div className="section">
            <h1>Context Generator</h1>
            {/* Generate button, which calls generate() */}
            <button onClick={() => generate()}>Generate</button>
            {/* Save button, which calls save() */}
            <button onClick={() => generationCallback(text)}>Save</button>
            <textarea value={text} onChange={(e) => setText(e.target.value)} onFocus={(e) => setText(e.target.value)} />
        </div>
    );
}

export default ContextGenerator;