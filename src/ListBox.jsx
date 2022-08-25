import React from "react";
import "./App.css";
import Entity from "./Entity";

const ListBox = ({ header, data, type = '', addEntityCallback, editEntityCallback, deleteEntityCallback, showLabels = false }) => {
    return (
        <div className={'sectionWrapper ' + type + '_wrapped'}>
            <div className={'sectionHeader ' + type + '_header'}>
                <h1>{header}</h1>
                <button onClick={() => addEntityCallback(data)}>Generate</button>
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
