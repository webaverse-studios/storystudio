// List editor box
// React component for editing a list of entities

import React from "react";
import "./App.css";
import { useEffect } from "react";
import Entity from "./Entity";

const ListBox = ({ header, data, type = '', addEntityHandler, editEntityHandler, deleteEntityHandler }) => {
    return (
        <div className={'sectionWrapper ' + type + '_wrapped'}>
            <div className={'sectionHeader ' + type + '_header'}>
                <h1>{header}</h1>
                <button onClick={() => addEntityHandler(type)}>Add</button>
            </div>
            <div className={'section ' + type}>
                {data?.map((entityData, index) => {
                    return (
                        <Entity key={index} entityData={entityData} editEntityHandler={editEntityHandler} deleteEntityHandler={deleteEntityHandler} />
                    );
                })
                }
            </div>
        </div>
    );
}

export default ListBox;