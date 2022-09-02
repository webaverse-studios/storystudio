import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForever from "@mui/icons-material/DeleteForever";
import PlusOne from "@mui/icons-material/PlusOne";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";

import "./App.css";
import { generateImage, generateVoice } from "./utils/generation";
import { availableVoices } from "./constants";

//field check if image, set source the img, if name change, generate new image
const Entity = ({
  index,
  data,
  editEntityCallback,
  deleteEntityCallback,
  moveEntityCallback,
  showLabels = false,
  type,
}) => {
  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = React.useState(false);

  const updateEntity = (ingredients, field, data, index) => {
    if (field === "shortname") {
      return;
    }
    let newData = { ...ingredients };
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
    if (!field) {
      newData = data;
    }
    editEntityCallback(newData, index);
  };
  const addInventoryItem = () => {
    const newItem = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors],
      length: 2,
      separator: " ",
    });

    updateEntity(
      data,
      "inventory",
      data["inventory"] && data["inventory"]?.length > 0
        ? data["inventory"] + ", " + newItem
        : newItem
    );
  };
  const removeInventoryItem = (item) => {
    const _inv =
      data["inventory"] && data["inventory"]?.length > 0
        ? data["inventory"].split(", ")
        : [];

    for (let i = 0; i < _inv.length; i++) {
      if (_inv[i] === item) {
        _inv.splice(i, 1);
        break;
      }
    }

    updateEntity(data, "inventory", _inv.join(", "));
  };
  const updateInventoryItem = (oldName, newName) => {
    const _inv =
      data["inventory"] && data["inventory"]?.length > 0
        ? data["inventory"].split(", ")
        : [];

    for (let i = 0; i < _inv.length; i++) {
      if (_inv[i] === oldName) {
        _inv[i] = newName;
        break;
      }
    }

    updateEntity(data, "inventory", _inv.join(", "));
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

  const renderVoice = () => {
    if (
      data.type === "character" ||
      data.type === "npc" ||
      data.type === "mob"
    ) {
      return (
        <div>
          <select
            value={data["voice"]}
            onChange={(event) => {
              updateEntity(data, "voice", event.target.value);
            }}
          >
            {availableVoices.length > 0 &&
              availableVoices.map((voice, idx) => (
                <option value={voice.voice} key={idx}>
                  {voice.name}
                </option>
              ))}
          </select>
          <button
            onClick={async () => {
              if (data["voice"]?.length <= 0) {
                return;
              }

              const voiceData = await generateVoice(
                data["voice"],
                data["description"]?.length > 0
                  ? data["description"]
                  : "Hello, how are you?"
              );
              const url = URL.createObjectURL(voiceData);
              audioPlayer = new Audio(url);
              audioPlayer.play();
            }}
          >
            Test Voice
          </button>
        </div>
      );
    } else {
      return null;
    }
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
              deleteEntityCallback(data, index) | setShouldDelete(false)
            }
          >
            <DeleteForever />
          </button>
        </span>
      )}
      {typeof data === "object" && (
        <React.Fragment>
          {Object.keys(data ?? []).map((field, i) => {
            if (
              field === "inventory" &&
              (data["type"] === "character" ||
                data["type"] === "npc" ||
                data["type"] === "mob")
            ) {
              return inventoryRender(data["inventory"], i);
            } else if (field === "voice") {
              return renderVoice();
            } else if (
              field === "type" ||
              field === "id" ||
              field === "hash" ||
              field === "nonce"
            ) {
              return null;
            } else if (field === "image") {
              return (
                <div key={i}>
                  <button
                    onClick={async () => {
                      updateEntity(
                        data,
                        field,
                        await generateImage(
                          data["name"] + " " + data["description"]
                        ),
                        index
                      );
                    }}
                  >
                    {data[field]?.length > 0
                      ? "Regenerate Image"
                      : "Generate Image"}
                  </button>
                  {data[field]?.length > 0 ? (
                    <img
                      className="photo"
                      key={i}
                      src={`data:image/jpeg;base64,${data[field]}`}
                      alt={data["name"]}
                    />
                  ) : null}
                </div>
              );
            }

            return (
              <div key={i} className={"entityField " + field}>
                {showLabels && (
                  <label style={{ display: "inline" }}>{field}</label>
                )}
                {field === "description" ? (
                  <textarea
                    value={data[field]}
                    onChange={(e) =>
                      updateEntity(data, field, e.target.value, index)
                    }
                  />
                ) : (
                  <input
                    type="text"
                    value={data[field]}
                    onChange={(e) => {
                      e.preventDefault();
                      updateEntity(data, field, e.target.value, index);
                    }}
                  />
                )}
              </div>
            );
          })}
        </React.Fragment>
      )}
      {typeof data === "string" && (
        <React.Fragment>
          <textarea
            type="text"
            value={data}
            onChange={(e) => {
              e.preventDefault();
              updateEntity(data, null, e.target.value, index);
            }}
          />
        </React.Fragment>
      )}
      <button onClick={() => moveEntityCallback(data, true)}>
        <ArrowUpwardIcon />
      </button>
      <button onClick={() => moveEntityCallback(data, false)}>
        <ArrowDownwardIcon />
      </button>
      <button
        onClick={() => {
          if (type === "lore") {
            const element = document.createElement("a");
            const file = new Blob([data], { type: "application/text" });
            element.href = URL.createObjectURL(file);
            element.download = "lore" + index + "_" + Date.now() + ".md";
            document.body.appendChild(element);
            element.click();
            element.remove();
          } else {
            const json = JSON.stringify(data);
            const element = document.createElement("a");
            const file = new Blob([json], { type: "application/json" });
            element.href = URL.createObjectURL(file);
            element.download =
              data["name"] + "_" + new Date().getTime() + ".json";
            document.body.appendChild(element);
            element.click();
            element.remove();
          }
        }}
      >
        {type === "lore" ? "Export MD" : "Export"}
      </button>
    </div>
  );
};

export default Entity;
