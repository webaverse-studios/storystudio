import React from "react";
import "./App.css";

const Entity = ({ entityData, editEntityCallback, deleteEntityCallback }) => {
  const updateEntity = (entityData, field, data) => {
    if (field === "shortname") {
      return;
    }

    console.log("updating entity", entityData, field, data);
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

  return (
    <div className={"entity"}>
      {typeof entityData === "object" && (
        <React.Fragment>
          {/* Basic inputs for a 'name', 'description' and 'shortname' field */}
          {/* whenever the user edits the form, the updateEntity function is called with the field and value sent to the function */}
          {Object.keys(entityData).map((field, index) => {
            if (
              field === "enabled" ||
              field === "type" ||
              field === "inventory" ||
              field === "id"
            )
              return null;
            return (
              <div key={index} className={"entityField " + field}>
                {field === "description" ? (
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
          {
            <button
              value={entityData.enabled}
              onClick={(e) =>
                updateEntity(entityData, "enabled", !entityData.enabled)
              }
            >
              {entityData.enabled ? "Disable" : "Enable"}
            </button>
          }
        </React.Fragment>
      )}
      {typeof entityData === "string" && (
        <React.Fragment>
          <p>{entityData}</p>
        </React.Fragment>
      )}
      <button onClick={() => deleteEntityCallback(entityData)}>x</button>
    </div>
  );
};

export default Entity;
