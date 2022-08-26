import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForever from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PlusOne from "@mui/icons-material/PlusOne";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";

import "./App.css";

const Entity = ({
  entityData,
  editEntityCallback,
  deleteEntityCallback,
  showLabels = false,
}) => {
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
  const addInventoryItem = () => {
    const newItem = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors],
      length: 2,
      separator: " ",
    });

    updateEntity(
      entityData,
      "inventory",
      entityData["inventory"] && entityData["inventory"]?.length > 0
        ? entityData["inventory"] + ", " + newItem
        : newItem
    );
  };
  const removeInventoryItem = (item) => {
    const _inv =
      entityData["inventory"] && entityData["inventory"]?.length > 0
        ? entityData["inventory"].split(", ")
        : [];

    for (let i = 0; i < _inv.length; i++) {
      if (_inv[i] === item) {
        _inv.splice(i, 1);
        break;
      }
    }

    updateEntity(entityData, "inventory", _inv.join(", "));
  };
  const updateInventoryItem = (oldName, newName) => {
    const _inv =
      entityData["inventory"] && entityData["inventory"]?.length > 0
        ? entityData["inventory"].split(", ")
        : [];

    for (let i = 0; i < _inv.length; i++) {
      if (_inv[i] === oldName) {
        _inv[i] = newName;
        break;
      }
    }

    updateEntity(entityData, "inventory", _inv.join(", "));
  };
  const inventoryRender = (inventory, _key) => {
    const _inv =
      inventory && inventory?.length > 0 ? inventory.split(", ") : [];
    return (
      <div key={_key}>
        <br />
        <br />
        {Object.keys(_inv).map((field, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                value={_inv[field]}
                onChange={(e) => {
                  e.preventDefault();
                  updateInventoryItem(_inv[field], e.target.value);
                }}
              />
              <button onClick={() => removeInventoryItem(_inv[field])}>
                <ClearIcon />
              </button>
              <br />
            </div>
          );
        })}
        <button onClick={() => addInventoryItem()}>
          <PlusOne />
        </button>
      </div>
    );
  };
  return (
    <div className={"entity"}>
      {!shouldDelete && (
        <span className="entityDelete">
          <button onClick={() => setShouldDelete(true)}>
            <ClearIcon />
          </button>
        </span>
      )}
      {shouldDelete && (
        <span className="entityDelete">
          <button onClick={() => setShouldDelete(false)}>
            <ClearIcon />
          </button>
          <button
            onClick={() =>
              deleteEntityCallback(entityData) || setShouldDelete(false)
            }
          >
            <DeleteForever />
          </button>
        </span>
      )}
      {
        <button
          className="entityVisibility"
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
            if (
              field === "inventory" &&
              (entityData["type"] === "character" ||
                entityData["type"] === "npc" ||
                entityData["type"] === "mob")
            ) {
              return inventoryRender(entityData["inventory"], index);
            } else if (
              field === "enabled" ||
              field === "type" ||
              field === "id" ||
              field === "hash" ||
              field === "nonce"
            )
              return null;
            return (
              <div key={index} className={"entityField " + field}>
                {showLabels && field !== "name" && field !== "message" && (
                  <label style={{ display: "inline" }}>{field}</label>
                )}
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
