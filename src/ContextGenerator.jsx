import React from "react";
import "./App.css"

const ContextGenerator = ({input, generationCallback}) => {
    const [text, setText] = React.useState('');

    return (
        <div className="sectionWrapper generator_wrapped">
            <div className={'sectionHeader context_header'}>
                <h1>generator</h1>
                <button onClick={() => generate()}>Generate</button>
            </div>
            <div className="section">
                <button onClick={() => generationCallback(text)}>Save</button>
                <textarea value={text} onChange={(e) => setText(e.target.value)} onFocus={(e) => setText(e.target.value)} />
            </div>
        </div>
    );
}

export default ContextGenerator;