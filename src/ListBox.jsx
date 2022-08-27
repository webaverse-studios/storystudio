import React, { useEffect } from "react";
import "./App.css";
import Entity from "./Entity";

const ListBox = ({ header, data, type = '', addEntityCallback, editEntityCallback, deleteEntityCallback, showLabels = false }) => {
    const [generating, setGenerating] = React.useState(false);
    return (
        <div className={'sectionWrapper ' + type + '_wrapped'}>
            <div className={'sectionHeader ' + type + '_header'}>
                <h1>{header}</h1>
                <button onClick={() => addEntityCallback(data, setGenerating)  }>{!generating ? 'Generate' : 'Generating...'}</button>
            </div>
            <div className={'section ' + type}>
                {data && Object.keys(data).map((key, index) => {
                    return (
                        <Entity key={index} data={data[key]} editEntityCallback={editEntityCallback} deleteEntityCallback={deleteEntityCallback} showLabels={showLabels} />
                    );
                })
                }
            </div>
        </div>
    );
}

export default ListBox;
