import React, { useState, useEffect } from "react";
import "./App.css"
import { EditableBox } from "./EditableBox";
import { contextTypes } from "./constants";

const ContextEditor = ({ data }) => {
    // hold state for current content type
    const [currentContentType, setCurrentContentType] = useState(contextTypes[0])

    // set currentData based on currentContentType
    const [currentData, setCurrentData] = useState(data)

    // if currentContentType is changed, set currentData to new value
    useEffect(() => {
        if(data && currentContentType)
        setCurrentData(data[currentContentType])
    }, [currentContentType]);

    return (
        <div className="sectionWrapper context_wrapped">
            <div className="radio-group">
                {contextTypes.map((type, index) => {
                    return (
                        <span key={index}>
                            <input type="radio" name="contextType" value={type} onChange={(e) => setCurrentContentType(e.target.value)} />
                            <label>{type}</label>
                        </span>
                    )
                }
                )}
            </div>
            <EditableBox text={currentData} setText={setCurrentData} />
        </div>
    );
}

export default ContextEditor;