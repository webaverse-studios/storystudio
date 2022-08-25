import React, { useEffect } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForever from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import "./App.css";

const Entity = ({ entityData, editEntityCallback, deleteEntityCallback, showLabels = false }) => {

    const [shouldDelete, setShouldDelete] = React.useState(false);

    const updateEntity = (entityData, field, data) => {
        if (field === "shortname") {
            return;
        }
        const newData = { ...entityData };
        newData[field] = data;
        if (field === "name") {
            console.log("name updated:", newData);
            newData["shortname"] =
                data.replace(" ", "").trim().toLowerCase().substring(0, 7) +
                "#" +
                newData["id"];
        } else if (field === "id") {
            newData["shortname"] =
                newData["name"].replace(" ", "").trim().toLowerCase().substring(0, 7) +
                "#" +
                data;
        }
        editEntityCallback(newData);
    };
    useEffect(() => {
        if(entityData){
            console.log(entityData);
        }
        }, [entityData]);
    return (
        <div className={"entity"}>
            {!shouldDelete &&
                <span className='entityDelete'>
                    <button onClick={() => setShouldDelete(true)}><ClearIcon /></button>
                </span>
            }
            {shouldDelete &&
                <span className='entityDelete'>
                    <button onClick={() => setShouldDelete(false)}><ClearIcon /></button>
                    <button onClick={() => deleteEntityCallback(entityData) || setShouldDelete(false)}><DeleteForever /></button>
                </span>
            }
            {
                <button
                    className='entityVisibility'
                    value={entityData.enabled}
                    onClick={(e) =>
                        updateEntity(entityData, "enabled", !entityData.enabled)
                    }
                >
                    {entityData.enabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
            }
            {typeof entityData === "object" && (
                <React.Fragment>
                    {Object.keys(entityData).map((field, index) => {
                        if (field === "enabled" || field === "type" || field === "inventory" || field === "id" || field === "hash" || field === "nonce") return null;
                        return (
                            <div key={index} className={"entityField " + field}>
                            {showLabels && field !== 'name' && field !== 'message' && <label style={{display: 'inline'}}>{field}</label>}
                                {field === "description" || field === "message" ? (
                                    <textarea
                                        value={entityData[field]}
                                        onChange={(e) =>
                                            updateEntity(entityData, field, e.target.value)
                                        }
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={entityData[field]}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            updateEntity(entityData, field, e.target.value);
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </React.Fragment>
            )}
            {typeof entityData === "string" && (
                <React.Fragment>
                    <p>{entityData}</p>
                </React.Fragment>
            )}
        </div>
    );
};

export default Entity;
