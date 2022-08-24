// List editor box
// React component for editing a list of entities

import React from "react";
import "./App.css";
import { useEffect } from "react";

const ListBox = ({ header, data, addEntityHandler, editEntityHandler, deleteEntityHandler }) => {
    return (
        <div className='section'>
            <h1>{header}</h1>
            <button onClick={() => addEntityHandler(data)}>Add</button>
            {data.map((entityData, index) => {
                return (
                    <div key={index}>
                        <Entity entityData={entityData} editEntityHandler={editEntityHandler} deleteEntityHandler={deleteEntityHandler} />
                    </div>
                );
            })
            }
        </div>
    );
}

export default ListBox;