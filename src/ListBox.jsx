import React, { useEffect } from "react";
import "./App.css";
import Entity from "./Entity";

const ListBox = ({ header, data, type = '', addEntityCallback, editEntityCallback, deleteEntityCallback, showLabels = false }) => {
    const [generating, setGenerating] = React.useState(false);
    useEffect (() => {
        if (generating) {
            setGenerating(false);
        }
    }, [data]);
    return (
        <div className={'sectionWrapper ' + type + '_wrapped'}>
            <div className={'sectionHeader ' + type + '_header'}>
                <h1>{header}</h1>
                <button onClick={() => addEntityCallback(data) || setGenerating(true)}>{!generating ? 'Generate' : 'Generating...'}</button>
            </div>
            <div className={'section ' + type}>
                {data && data.map((entityData, index) => {
                    return (
                        <Entity key={index} entityData={entityData} editEntityCallback={editEntityCallback} deleteEntityCallback={deleteEntityCallback} showLabels={showLabels} />
                    );
                })
                }
            </div>
        </div>
    );
}

export default ListBox;
