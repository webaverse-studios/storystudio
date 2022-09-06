import React, { useContext, useState } from "react";
import { ClearIcon, DeleteForever } from "../styles/icons/icons";
import { ApplicationContext } from "../Context";
import MonacoEditor from "@monaco-editor/react";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect } from "react";
import { delimiters } from "../utils/constants";
import { makeGenerateFn } from "../utils/generation";

//field check if image, set source the img, if name change, generate new image
const Dialogue = ({ index, _key, type, editJson }) => {
  const {
    editDialogueCallback,
    deleteDialogueCallback,
    dialogue,
    currentDialogueType,
    editDialogueJson,
    entities,
    removeEntryFromDialogue,
    addDialogueEntry,
    getObject,
    getCharacter,
    getNPC,
    getLocation,
    getMob,
    baseData,
    getTypeOfObject,
    addDialogueEntryWithData,
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
  const updateCharacters = (newTagsCharacters) => {
    const chars = [];
    for (let i = 0; i < newTagsCharacters.length; i++) {
      chars.push(newTagsCharacters[i].text);
    }
    handleChange(chars, "input.characters");
  };

  const handleDeleteObject = (i) => {
    const newTagsObjects = [...tagObjects];
    newTagsObjects.splice(i, 1);
    setTagObjects(newTagsObjects);
    updateObjects(newTagsObjects);
  };
  const handleAddObject = (tag) => {
    const newTagsObjects = [...tagObjects];
    newTagsObjects.unshift(tag);
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
  const updateNPC = (newTagsNPCs) => {
    const npcs = [];
    for (let i = 0; i < newTagsNPCs.length; i++) {
      npcs.push(newTagsNPCs[i].text);
    }
    handleChange(npcs, "input.npcs");
  };

  const generate = async (selector, type, needsData, data) => {
    console.log("generate:", selector, type);
    let res = "";

    if (type === "objectComment") {
      const obj = getObject(data);
      const description = obj ? obj.description : "";

      res = await baseData.module.generateObjectComment(
        { name: data, description },
        makeGenerateFn()
      );
      res = res.value;
    } else if (type === "npcComment") {
      const obj = getNPC(data);
      const description = obj ? obj.description : "";

      res = await baseData.module.generateObjectComment(
        { name: data, description },
        makeGenerateFn()
      );
      res = res.value;
    } else if (type === "mobComment") {
      const obj = getMob(data);
      const description = obj ? obj.description : "";

      res = await baseData.module.generateObjectComment(
        { name: data, description },
        makeGenerateFn()
      );
      res = res.value;
    } else if (type === "loadingComment") {
      const obj = getLocation(data);
      const description = obj ? obj.description : "";

      res = await baseData.module.generateLocationComment(
        {
          name: data,
          description,
          dstCharacter:
            entities["character"]?.length > 0
              ? entities["character"][0].name
              : "user",
        },
        makeGenerateFn()
      );
      res = res.comment;
    } else if (type === "exposition") {
      const location =
        entities["location"]?.length > 0
          ? entities["location"][
              Math.floor(Math.random() * entities["location"].length)
            ]
          : { name: "Test", Description: "Test" };

      const character =
        entities["character"]?.length > 0
          ? entities["character"][
              Math.floor(Math.random() * entities["character"].length)
            ]
          : { name: "Test" };

      res = await baseData.module.generateExposition(
        {
          name: character.name,
          location: `${location.name}\n${location.description}`,
          type: getTypeOfObject(data),
        },
        makeGenerateFn()
      );
      res = res.comment;
    } else if (
      type === "banter" ||
      type === "rpgDialogue" ||
      type === "reactions" ||
      type === "actions"
    ) {
      res = await baseData.module.generateBanter(
        dialogue[currentDialogueType][_key].input.characters[
          Math.floor(
            Math.random() *
              dialogue[currentDialogueType][_key].input.characters.length
          )
        ],
        makeGenerateFn()
      );
    } else if (type === "cutscenes") {
      const _input = {
        location: dialogue[currentDialogueType][_key].input.location,
        chars: dialogue[currentDialogueType][_key].input.characters,
        npcs: dialogue[currentDialogueType][_key].input.npcs,
        objects: dialogue[currentDialogueType][_key].input.objects,
      };

      _input.location = getLocation(_input.location);
      for (let i = 0; i < _input.chars.length; i++) {
        _input.chars[i] = getCharacter(_input.chars[i]);
      }
      for (let i = 0; i < _input.npcs.length; i++) {
        _input.npcs[i] = getNPC(_input.npcs[i]);
      }
      for (let i = 0; i < _input.objects.length; i++) {
        _input.objects[i] = getObject(_input.objects[i]);
      }
      const input = {
        location: _input.location,
        characters: _input.chars.concat(_input.npcs),
        objects: _input.objects,
      };

      res = await baseData.module.generateCutscene(input, makeGenerateFn());
      for (let i = 0; i < res.messages.length; i++) {
        addDialogueEntryWithData(
          _key,
          res.messages[i].character.name,
          res.messages[i].message
        );
      }
      return;
    }

    if (res?.length <= 0 || type === "cutscenes") {
      return;
    }

    handleChange(
      needsData ? { speaker: data["speaker"], message: res } : res,
      selector
    );
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
    console.log("DATA:", data);
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
            allowDragDrop={false}
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
        if (
          Object.keys(data).includes("speaker") &&
          Object.keys(data).includes("message")
        ) {
          output = (
            <div>
              <select
                value={data["speaker"]}
                onChange={(e) => {
                  data["speaker"] = e.target.value;
                  handleChange(
                    { speaker: data["speaker"], message: data["message"] },
                    selector
                  );
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
              :{" "}
              <input
                className="dialogueInput"
                type="text"
                value={data["message"]}
                onChange={(e) => {
                  setLastSelector(selector);
                  // get the position in the input field and call setLastCursor(position)
                  setLastCursor(e.target.selectionStart);
                  handleChange(
                    { speaker: data["speaker"], message: e.target.value },
                    selector
                  );
                }}
                autoFocus={lastSelector === selector}
              />
              {(type === "rpgDialogue" ||
                type === "banter" ||
                type === "cutscenes") && (
                <button
                  onClick={() => {
                    removeEntryFromDialogue(selector, index);
                  }}
                >
                  Delete
                </button>
              )}
              {type !== "cutscenes" && (
                <button onClick={() => generate(selector, type, true, data)}>
                  Generate
                </button>
              )}
            </div>
          );
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
      }
    } else if (label === "target") {
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
            {(type === "exposition"
              ? [
                  ...entities["character"],
                  ...entities["object"],
                  ...entities["location"],
                  ...entities["npc"],
                ]
              : entities[
                  type.replace("loading", "location").replace("Comment", "")
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
      output = (
        <div>
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
          {type !== "cutscenes" && (
            <button
              onClick={() => {
                generate(
                  selector,
                  type,
                  false,
                  dialogue[currentDialogueType][_key].input.target
                );
              }}
            >
              Generate
            </button>
          )}
        </div>
      );
    } else if (label === "speaker") {
      output = (
        // render a dropdown selection based on allData.input.characters
        <div>
          <select
            value={data}
            onChange={(e) => {
              data = e.target.value;
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
          {(type === "rpgDialogue" ||
            type === "banter" ||
            type === "cutscenes") && (
            <button
              onClick={() => {
                removeEntryFromDialogue(selector, index);
              }}
            >
              Delete
            </button>
          )}
        </div>
      );
    } else if (label === "location") {
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
              onMount={(editor) => {
                setTimeout(function () {
                  editor.getAction("editor.action.formatDocument").run();
                }, 100);
              }}
              value={JSON.stringify(dialogue[currentDialogueType][_key])}
              onChange={(value) => {
                editDialogueJson(JSON.parse(value), _key);
              }}
            />
          ) : (
            <div>
              {DisplayJSONAsEditableForm({
                data: dialogue[currentDialogueType][_key],
                allData: dialogue,
                type,
              })}
              {(type === "rpgDialogue" ||
                type === "banter" ||
                type === "cutscenes") && (
                <button
                  onClick={() => {
                    addDialogueEntry(_key);
                  }}
                >
                  Add Message
                </button>
              )}
              {type === "cutscenes" && (
                <button
                  onClick={() => {
                    generate("", type, false, null);
                  }}
                >
                  Generate
                </button>
              )}
            </div>
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
