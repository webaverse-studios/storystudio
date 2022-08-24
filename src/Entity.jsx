import React from "react";
import "./App.css";

const Entity = ({ entityData, editEntityHandler, deleteEntityHandler }) => {
    return (
        <div>
            <h1>{entityData.name}</h1>
            <h2>{entityData.shortname}</h2>
            <p>{entityData.description}</p>
            <button onClick={() => editEntityHandler(entityData)}>Edit</button>
            <button onClick={() => deleteEntityHandler(entityData)}>Delete</button>
        </div>
    );
}

export default Entity;