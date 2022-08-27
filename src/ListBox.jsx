import React, { useEffect } from "react";
import "./App.css";
import Entity from "./Entity";

const ListBox = ({ header, data, type = '', addEntityCallback, editEntityCallback, deleteEntityCallback, showLabels = false }) => {
    const [generating, setGenerating] = React.useState(false);
    console.log('data', data)

    useEffect(() => {
        // if generating is true, set timer to check if the length of data is more than it was before
        /*if (generating) {
            const dataLength = data.length;
            let elapsedTime = 0;
            const maxTime = 5000;
            const timer = setInterval(() => {
                if (data.length > dataLength || elapsedTime > maxTime) {
                    setGenerating(false);
                    clearInterval(timer);
                }
                elapsedTime += 500;
            }, 500);
        }*/
    }, [generating]);
    return (
        <div className={'sectionWrapper ' + type + '_wrapped'}>
            <div className={'sectionHeader ' + type + '_header'}>
                <h1>{header}</h1>
                <button onClick={() => addEntityCallback(data, setGenerating)  }>{!generating ? 'Generate' : 'Generating...'}</button>
            </div>
            <div className={'section ' + type}>
                {data && data.map((ingredients, index) => {
                    return (
                        <Entity key={index} ingredients={ingredients} editEntityCallback={editEntityCallback} deleteEntityCallback={deleteEntityCallback} showLabels={showLabels} />
                    );
                })
                }
            </div>
        </div>
    );
}

export default ListBox;
