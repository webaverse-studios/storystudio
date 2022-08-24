import React from "react";
import "./App.css";

const Entity = ({ entityData, toggleEntityHandler = null, editEntityHandler, deleteEntityHandler }) => {
    return (
        <div className={'entity'}>
        {typeof entityData === 'object' && (
            <React.Fragment>
            {entityData.name && <h1>{entityData.name}</h1>}
            {entityData.shortname && <h2>{entityData.shortname}</h2>}
            {entityData.description && <p>{entityData.description}</p>}
            {toggleEntityHandler && <button onClick={() => toggleEntityHandler(entityData)}>{entityData.enabled ? 'Disable' : 'Enable'}</button>}
            </React.Fragment>
        )}
        {typeof entityData === 'string' && (
            <React.Fragment>
            <p>{entityData}</p>
            </React.Fragment>
        )}
        <button onClick={() => editEntityHandler(entityData)}>Edit</button>
        <button onClick={() => deleteEntityHandler(entityData)}>Delete</button>
        </div>
    );
}

export default Entity;