import React from "react";
import "./App.css"
import { contextTypes } from "./constants";

const ContextEditor = ({ data, currentContentType, setCurrentContentType }) => {
    return (
        <div className="sectionWrapper context_wrapped">
            <div className="radio-group">
                {contextTypes.map((type, index) => {
                    return (
                        <span
                            key={index}
                            onClick={(e) => setCurrentContentType(e.target.value)}
                            className={'context-radio' + type === currentContentType ? ' context-radio-active' : 'context-radio-inactive'}
                        >
                            {type}|{data[type].length}
                        </span>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default ContextEditor;