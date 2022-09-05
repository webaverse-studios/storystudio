import React, { useContext, useState } from "react";
import { ClearIcon, DeleteForever } from "../styles/icons/icons";
import { ApplicationContext } from "../Context";
import MonacoEditor from "@monaco-editor/react";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect } from "react";

//field check if image, set source the img, if name change, generate new image
const Dialogue = ({ index, _key, type, editJson }) => {
  const {
    editDialogueCallback,
    deleteDialogueCallback,
    dialogue,
    currentDialogueType,
    editDialogueJson,
    entities,
  } = useContext(ApplicationContext);

  const [lastSelector, setLastSelector] = useState(null);
  const [lastCursor, setLastCursor] = useState(null);
  const [tagsCharacters, setTagsCharacters] = useState([]);
  const [tagObjects, setTagObjects] = useState([]);
  const [tagNPCs, setTagNPCs] = useState([]);

  useEffect(() => {
    const newTagsCharacters = (
      dialogue[currentDialogueType][_key].input.characters ?? []
    ).map((character) => {
      return { id: character, text: character };
    });
    setTagsCharacters(newTagsCharacters);

    const newTagsObjects = (
      dialogue[currentDialogueType][_key].input.objects ?? []
    ).map((obj) => {
      return { id: obj, text: obj };
    });
    setTagObjects(newTagsObjects);

    const newTagsNPCs = (
      dialogue[currentDialogueType][_key].input.npcs ?? []
    ).map((npc) => {
      return { id: npc, text: npc };
    });
    setTagNPCs(newTagsNPCs);
  }, [currentDialogueType]);

  let suggestionsCharacters = (entities["character"] ?? []).map((item) => {
    return {
      id: item.name,
      text: item.name,
    };
  });
  let suggestionsObjects = (entities["object"] ?? []).map((item) => {
    return {
      id: item.name,
      text: item.name,
    };
  });
  let suggestionsNPCs = (entities["npcs"] ?? []).map((item) => {
    return {
      id: item.name,
      text: item.name,
    };
  });
  useEffect(() => {
    suggestionsCharacters = (entities["character"] ?? []).map((item) => {
      return {
        id: item.name,
        text: item.name,
      };
    });
    suggestionsObjects = (entities["object"] ?? []).map((item) => {
      return {
        id: item.name,
        text: item.name,
      };
    });
    suggestionsNPCs = (entities["npcs"] ?? []).map((item) => {
      return {
        id: item.name,
        text: item.name,
      };
    });
  }, [entities]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDeleteCharacter = (i) => {
    const newTagsCharacters = [...tagsCharacters];
    newTagsCharacters.splice(i, 1);
    setTagsCharacters(newTagsCharacters);
    updateCharacters(newTagsCharacters);
  };
  const handleAddCharacter = (tag) => {
    const newTagsCharacters = [...tagsCharacters];
    newTagsCharacters.unshift(tag);
    setTagsCharacters(newTagsCharacters);
    updateCharacters(newTagsCharacters);
  };
  const handleDragCharacter = (tag, currPos, newPos) => {
    const newTagsCharacters = tagsCharacters.slice();

    newTagsCharacters.splice(currPos, 1);
    newTagsCharacters.splice(newPos, 0, tag);

    // re-render
    setTagsCharacters(newTagsCharacters);
    updateCharacters(newTagsCharacters);
  };
  const updateCharacters = (newTagsCharacters) => {
    const chars = [];
    for (let i = 0; i < newTagsCharacters.length; i++) {
      chars.push(newTagsCharacters[i].text);
    }
    console.log("UPDATE CHARACTERS:", chars);
    handleChange(chars, "input.characters");
  };

  const handleDeleteObject = (i) => {
    const newTagsObjects = [...tagObjects];
    newTagsObjects.splice(i, 1);
    setTagObjects(newTagsObjects);
    updateObjects(newTagsObjects);
  };
  const handleAddObject = (tag) => {
    console.log("add new object:", tag);
    const newTagsObjects = [...tagObjects];
    newTagsObjects.unshift(tag);
    setTagObjects(newTagsObjects);
    updateObjects(newTagsObjects);
  };
  const handleDragObject = (tag, currPos, newPos) => {
    const newTagsObjects = tagObjects.slice();

    newTagsObjects.splice(currPos, 1);
    newTagsObjects.splice(newPos, 0, tag);

    // re-render
    setTagObjects(newTagsObjects);
    updateObjects(newTagsObjects);
  };
  const updateObjects = (newTagsObjects) => {
    const objects = [];
    for (let i = 0; i < newTagsObjects.length; i++) {
      objects.push(newTagsObjects[i].text);
    }
    handleChange(objects, "input.objects");
  };

  const handleDeleteNPC = (i) => {
    const newTagsNPCs = [...tagNPCs];
    newTagsNPCs.splice(i, 1);
    setTagNPCs(newTagsNPCs);
    updateNPC(newTagsNPCs);
  };
  const handleAddNPC = (tag) => {
    const newTagsNPCs = [...tagNPCs];
    newTagsNPCs.unshift(tag);
    setTagNPCs(newTagsNPCs);
    updateNPC(newTagsNPCs);
  };
  const handleDragNPC = (tag, currPos, newPos) => {
    const newTagsNPCs = tagNPCs.slice();

    newTagsNPCs.splice(currPos, 1);
    newTagsNPCs.splice(newPos, 0, tag);

    // re-render
    setTagNPCs(newTagsNPCs);
    updateNPC(newTagsNPCs);
  };
  const updateNPC = (newTagsNPCs) => {
    const npcs = [];
    for (let i = 0; i < newTagsNPCs.length; i++) {
      npcs.push(newTagsNPCs[i].text);
    }
    handleChange(npcs, "input.npcs");
  };

  function handleChange(data, selector) {
    //console.log("data, selector", data, selector);
    editDialogueCallback(data, selector, _key, index);
  }
  function DisplayJSONAsEditableForm({
    data,
    allData,
    type,
    label = "",
    selector = "",
  }) {
    const { entities } = useContext(ApplicationContext);

    if (label === "characters" || label === "objects" || label === "npcs") {
      return (
        <div>
          {label === "characters"
            ? "Characters"
            : label === "objects"
            ? "Objects"
            : "NPCs"}
          :
          <br />
          <ReactTags
            tags={
              label === "characters"
                ? tagsCharacters
                : label === "objects"
                ? tagObjects
                : tagNPCs
            }
            suggestions={
              label === "characters"
                ? suggestionsCharacters
                : label === "objects"
                ? suggestionsObjects
                : suggestionsNPCs
            }
            delimiters={delimiters}
            handleDelete={
              label === "characters"
                ? handleDeleteCharacter
                : label === "objects"
                ? handleDeleteObject
                : handleDeleteNPC
            }
            handleAddition={
              label === "characters"
                ? handleAddCharacter
                : label === "objects"
                ? handleAddObject
                : handleAddNPC
            }
            handleDrag={
              label === "characters"
                ? handleDragCharacter
                : label === "objects"
                ? handleDragObject
                : handleDragNPC
            }
            inputFieldPosition="bottom"
            autocomplete
          />
          <br />
        </div>
      );
    }
    let output = null;
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        output = data.map((item, index) => {
          return (
            <div style={{ marginLeft: "2em" }} key={index}>
              <DisplayJSONAsEditableForm
                key={index}
                type={type}
                data={item}
                allData={allData}
                selector={selector + (selector !== "" ? "." : "") + index}
              />
            </div>
          );
        });
      } else {
        output = Object.keys(data).map((key, index) => {
          return (
            <div style={{ marginLeft: "2em" }} key={index}>
              <DisplayJSONAsEditableForm
                key={index}
                type={type}
                label={key}
                data={data[key]}
                allData={allData}
                selector={selector + (selector !== "" ? "." : "") + key}
              />
            </div>
          );
        });
      }
    } else if (label === "ta  rget") {
      //console.log("type is", type);
      //console.log("*** data is", data);
      return (
        <div>
          <label style={{ margin: ".5em" }}>{label}</label>
          {/* render a select dropdown with all of the entities for the current type */}
          <select
            value={data}
            onChange={(e) => {
              data = e.target.value;
              handleChange(data, selector);
            }}
          >
            {(type === "loreExposition"
              ? [
                  ...entities["character"],
                  ...entities["object"],
                  ...entities["setting"],
                  ...entities["npc"],
                ]
              : entities[
                  type.replace("loading", "setting").replace("Comment", "")
                ]
            ).map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
    // render outputs as an input field
    else if (label === "message" || label === "action" || label === "comment") {
      //console.log("comment is", data);
      output = (
        <input
          className="dialogueInput"
          type="text"
          value={data}
          onChange={(e) => {
            setLastSelector(selector);
            // get the position in the input field and call setLastCursor(position)
            setLastCursor(e.target.selectionStart);
            handleChange(e.target.value, selector);
          }}
          autoFocus={lastSelector === selector}
        />
      );
    } else if (label === "speaker") {
      output = (
        // render a dropdown selection based on allData.input.characters
        <select
          value={data}
          onChange={(e) => {
            handleChange(data, selector);
          }}
        >
          {[
            ...dialogue[currentDialogueType][_key].input.characters,
            ...dialogue[currentDialogueType][_key].input.npcs,
          ].map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      );
    } else if (label === "setting") {
      output = (
        <select
          value={data}
          onChange={(e) => {
            data = e.target.value;
            handleChange(data, selector);
          }}
        >
          {entities[label].map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      );
    }

    return (
      <div style={{ margin: ".5em" }}>
        {label}

        {output}
      </div>
    );
  }
  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = React.useState(false);

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
              deleteDialogueCallback(
                dialogue[currentDialogueType][_key],
                index
              ) | setShouldDelete(false)
            }
          >
            <DeleteForever />
          </button>
        </span>
      )}
      {typeof dialogue[currentDialogueType][_key] === "object" && (
        <React.Fragment>
          {!editJson ? (
            <MonacoEditor
              width="100%"
              height="90vh"
              language="json"
              theme="light"
              value={JSON.stringify(dialogue[currentDialogueType][_key])}
              onChange={(value) => {
                editDialogueJson(JSON.parse(value), _key);
              }}
            />
          ) : (
            DisplayJSONAsEditableForm({
              data: dialogue[currentDialogueType][_key],
              allData: dialogue,
              type,
            })
          )}
        </React.Fragment>
      )}
      {/*<button onClick={() => moveDialogueCallback(data, true)}>
        <ArrowUpwardIcon />
      </button>
      <button onClick={() => moveDialogueCallback(data, false)}>
        <ArrowDownwardIcon />
          </button>*/}
    </div>
  );
};

export default Dialogue;
