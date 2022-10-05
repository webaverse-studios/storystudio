import React, { useContext } from "react";
import {
  ArrowDown,
  ArrowUp,
  ClearIcon,
  DeleteForever,
} from "../styles/icons/icons";

import "../styles/App.css";
import { ApplicationContext } from "../Context";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect } from "react";
import { delimiters } from "../utils/constants";
import { generateImage, generateVoice } from "../utils/generation";
import { deleteFile, uploadFile } from "../utils/storageUtils";
import { useState } from "react";

const Entity = ({
  index,
  data,
  editEntityCallback,
  deleteEntityCallback,
  moveEntityCallback,
  type,
}) => {
  const {
    getInventoryItems,
    voiceApi,
    imgApi,
    generateImages,
    web3Storage,
    availableVoices,
  } = useContext(ApplicationContext);

  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [savingImage, setSavingImage] = useState(false);
  const [cancelingImage, setCancelingImage] = useState(false);

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
      <div className="wrapper" key={_key}>
        Inventory:
        <br />
        <br />
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAdd}
          inputFieldPosition="inline"
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
        <div className="wrapper">
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
                voiceApi,
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

  const deleteImage = async () => {
    console.log("deleting image");
    setCancelingImage(true);
    if (data["image"]?.length === 59 && !cancelingImage) {
      await deleteFile(web3Storage, data["image"]);
    }

    let newData = { ...data };
    newData["image"] = "";
    newData["imageCid"] = "";
    editEntityCallback(newData, index);
    setCancelingImage(false);
    console.log("deleted");
  };

  const saveImage = async () => {
    if (savingImage) {
      return;
    }

    if (!data["image"] || data["imageCid"]?.length === 59) {
      return;
    }

    setSavingImage(true);
    const cid = await uploadFile(web3Storage, data["image"]);
    updateEntity(data, "imageCid", cid, index);
    setSavingImage(false);
  };

  return (
    <div className={"entity"}>
      <div className={"entityUpDown"}>
        <button onClick={() => moveEntityCallback(data, true)}>
          <ArrowUp />
        </button>
        <button onClick={() => moveEntityCallback(data, false)}>
          <ArrowDown />
        </button>
      </div>
      <div className={"entityBody"}>
        {typeof data === "object" && type !== "loreFiles" ? (
          Object.keys(data || []).map((field, i) => {
            if (
              field === "inventory" &&
              (data["type"] === "character" ||
                data["type"] === "npc" ||
                data["type"] === "mob")
            ) {
              return inventoryRender(data["inventory"], i);
            } else if (field === "voice") {
              return renderVoice();
            }
            if (
              field === "inventory" ||
              field === "shortname" ||
              field === "img" ||
              field === "type" ||
              field === "id" ||
              field === "hash" ||
              field === "nonce" ||
              field === "imageCid" ||
              field === "image" ||
              field === "bio"
            ) {
              return null;
            }
            return (
              <div key={i} className={"entityField " + field}>
                {field !== "name" && field !== "description" && (
                  <label style={{ display: "inline" }}>{field}</label>
                )}
                {field === "description" ? (
                  <textarea
                    rows={1}
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
          })
        ) : (
          <React.Fragment>
            <textarea
              rows={20}
              key={index}
              type="text"
              value={data || ""}
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
              rows={1}
              type="text"
              value={data}
              onChange={(e) => {
                e.preventDefault();
                updateEntity(data, null, e.target.value, index);
              }}
            />
          </React.Fragment>
        )}
        {type === "loreFiles" ||
        type === "character" ||
        type === "npc" ||
        type === "mob" ||
        type === "location" ||
        type === "object" ? (
          <button
            onClick={() => {
              if (type === "loreFiles") {
                const element = document.createElement("a");
                const file = new Blob([data], { type: "application/text" });
                element.href = URL.createObjectURL(file);
                element.download = "lore" + index + "_" + Date.now() + ".md";
                document.body.appendChild(element);
                element.click();
                element.remove();
              } else {
                const temp = data
                temp.image = "";
                const json = JSON.stringify(temp);
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
      <div className={"entityDeleteWrapper"}>
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
      </div>

      {generateImages && type !== "loreFiles" && (
        <div className="entityImage">
          {data["image"] && data["image"].length > 0 ? (
            <img
              className="photo"
              src={`data:image/jpeg;base64,${data["image"]}`}
              alt={data["name"]}
            />
          ) : null}
          {data["image"]?.length > 0 && (
            <div>
              <button onClick={deleteImage}>
                {cancelingImage ? "Canceling..." : "Cancel"}
              </button>
              <button onClick={saveImage}>
                {savingImage ? "Saving..." : "Save"}
              </button>
            </div>
          )}
          <button
            onClick={async () => {
              if (generatingImage) {
                return;
              }

              setGeneratingImage(true);
              if (data["image"]?.length > 0 || data["imageCid"]?.length > 0) {
                await deleteImage();
              }
              updateEntity(
                data,
                "image",
                await generateImage(
                  imgApi,
                  data["name"] + " " + data["description"]
                ),
                index
              );
              setGeneratingImage(false);
            }}
          >
            {generatingImage
              ? "Generating..."
              : data["image"]?.length > 0
              ? "Regenerate Image"
              : "Generate Image"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Entity;
