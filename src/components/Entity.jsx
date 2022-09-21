import React, { useContext } from "react";
import { ClearIcon, DeleteForever } from "../styles/icons/icons";

import "../styles/App.css";
import { ApplicationContext } from "../Context";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect } from "react";
import { delimiters, availableVoices } from "../utils/constants";
import { generateImage, generateVoice } from "../utils/generation";

//field check if image, set source the img, if name change, generate new image
const Entity = ({
  index,
  data,
  editEntityCallback,
  deleteEntityCallback,
  moveEntityCallback,
  type,
}) => {
  const { getInventoryItems, loreFiles } = useContext(ApplicationContext);

  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = React.useState(false);

  const updateEntity = (entities, field, data, index) => {
    if (field) {
      if (field === "shortname") {
        return;
      }
      let newData = { ...entities };
      newData[field] = data;
      if (field === "name") {
        console.log("name updated:", newData);
        // newData["shortname"] =
        //   data.replace(" ", "").trim().toLowerCase().substring(0, 7) +
        //   "#" +
        //   newData["id"];
      } else if (field === "inventory") {
        console.log("updating inventory:", newData["inventory"], data);
      }
      // else if (field === "id") {
      //   newData["shortname"] =
      //     newData["name"].replace(" ", "").trim().toLowerCase().substring(0, 7) +
      //     "#" +
      //     data;
      // }
      if (!field) {
        newData = data;
      }
      editEntityCallback(newData, index);
    } else {
      editEntityCallback(data, index);
    }
  };

  const suggestions = getInventoryItems().map((item) => {
    return {
      id: item,
      text: item,
    };
  });

  const [tags, setTags] = React.useState([]);
  useEffect(() => {
    console.log(typeof data)
    if (typeof data === "object" && data) {
      if (data["inventory"] && data["inventory"].length > 0) {
        setTags(
          data["inventory"].split(", ").map((item) => {
            return {
              id: item,
              text: item,
            };
          })
        );
      }
    }
  }, []);
  const handleDelete = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    updateInventory(newTags);
  };
  const handleAdd = (tag) => {
    const newTags = [...tags];
    newTags.unshift(tag);
    setTags(newTags);
    updateInventory(newTags);
  };
  const updateInventory = (newTags) => {
    const inv = [];
    for (let i = 0; i < newTags.length; i++) {
      inv.push(newTags[i].text);
    }
    updateEntity(data, "inventory", inv.join(", "), index);
  };

  const inventoryRender = (inventory, _key) => {
    return (
      <div key={_key}>
        Inventory:
        <br />
        <br />
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAdd}
          inputFieldPosition="bottom"
          autocomplete
          allowDragDrop={false}
        />
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
              if (data["voice"] && data["voice"].length <= 0) {
                return;
              }

              const voiceData = await generateVoice(
                data["voice"],
                data["description"] && data["description"].length > 0
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
      {typeof data === "object" && type !== "loreFiles" ? (
        <React.Fragment>
          {Object.keys(data || []).map((field, i) => {
            if (
              field === "inventory" &&
              (data["type"] === "character" ||
                data["type"] === "npc" ||
                data["type"] === "mob")
            ) {
              return inventoryRender(data["inventory"], i);
            }
            else if (field === "voice") {
              return renderVoice();
            }
            if (
              // TODO: remove these when they are properly handled
              field === "inventory" ||
              field === "img" ||
              field === "image" ||
              field === "shortname" ||
              field === "type" ||
              field === "id" ||
              field === "hash" ||
              field === "nonce"
            ) {
              return null;
            }
            else if (field === "image") {
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
                    {data[field] && data[field].length > 0
                      ? "Regenerate Image"
                      : "Generate Image"}
                  </button>
                  {data[field] && data[field].length > 0 ? (
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
                <label style={{ display: "inline" }}>{field}</label>
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
      ) : (
        <React.Fragment>
          <textarea
            key={index}
            type="text"
            value={data ?? ""}
            onChange={(e) => {
              e.preventDefault();
              updateEntity(data, null, e.target.value, index);
            }}
          />
        </React.Fragment>
      )}
      {typeof data === "string" && type !== "loreFiles" && (
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
      {/*<button onClick={() => moveEntityCallback(data, true)}>
        <ArrowUpwardIcon />
      </button>
      <button onClick={() => moveEntityCallback(data, false)}>
        <ArrowDownwardIcon />
          </button>*/}
      {type === "loreFiles" ||
      type === "character" ||
      type === "npc" ||
      type === "mob" ||
      type === "location" ||
      type === "object" ? (
        <button
          onClick={() => {
            console.log(type);
            if (type === "loreFiles") {
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
          {type === "loreFiles" ? "Export MD" : "Export"}
        </button>
      ) : null}
    </div>
  );
};

export default Entity;