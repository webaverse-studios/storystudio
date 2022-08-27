import React from "react";
import "./App.css"
import { contextTypes } from "./constants";

const ContextSelector = ({ data, currentContentType, setCurrentContentType }) => {
    return (
        <div className="sectionWrapper context_wrapped">
            <div className="context-group">
                {contextTypes.map((type, index) => {
                    return (
                        <button
                            key={index}
                            onClick={(e) => setCurrentContentType(type)}
                            className={'context-group-button' + (type === currentContentType ? ' context-group-button-active' : ' context-group-button-inactive')}
                        >
                            {type}|{data[type]}
                        </button>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default ContextSelector;