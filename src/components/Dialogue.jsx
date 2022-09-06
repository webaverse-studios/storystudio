import React, { useContext, useState } from "react";
import { ClearIcon, DeleteForever } from "../styles/icons/icons";
import { ApplicationContext } from "../Context";
import MonacoEditor from "@monaco-editor/react";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect } from "react";
import { delimiters } from "../utils/constants";
import { makeGenerationFn } from "../utils/generation";

//field check if image, set source the img, if name change, generate new image
const Dialogue = ({ index, _key, type }) => {
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
    getSetting,
    getMob,
    baseData,
    getTypeOfObject,
    addDialogueEntryWithData,
    cleanDialogueMessages,
  } = useContext(ApplicationContext);

  const [editJson, setEditJson] = useState(true);
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

  const [currentPrompt, setCurrentPrompt] = useState({
    objectComment: "",
    npcComment: "",
    mobComment: "",
    loadingComment: "",
    banter: "",
    exposition: "",
    rpgDialogue: "",
    reactions: "",
    cutscenes: "",
    quests: "",
  });
  const getPrompt = async (type, input) => {
    if (currentPrompt[type]?.length > 0) {
      console.log("returning current prompt:", currentPrompt[type]);
      return currentPrompt[type];
    }

    const temp = dialogue[currentDialogueType][_key].output?.prompt;
    let prompt = "";
    if (temp && temp?.length > 0 && temp !== "Prompt") {
      const newData = { ...currentPrompt };
      newData[type] = temp;
      setCurrentPrompt(newData);
      console.log("returning from temp");
      return currentPrompt[type];
    } else {
      switch (type) {
        case "objectComment":
          prompt = await baseData.module.makeCommentPrompt(input);
          break;
        case "npcComment":
          prompt = await baseData.module.makeCommentPrompt(input);
          break;
        case "mobComment":
          prompt = await baseData.module.makeCommentPrompt(input);
          break;
        case "loadingComment":
          prompt = await baseData.module.makeCommentPrompt(input);
          break;
        case "banter":
          prompt = await baseData.module.makeBanterPrompt(input);
          break;
        case "exposition":
          prompt = await baseData.module.makeExpositionPrompt(input);
          console.log("lore exposition prompt:", prompt);
          break;
        case "rpgDialogue":
          prompt = await baseData.module.makeRPGDialoguePrompt(input);
          break;
        case "reactions":
          prompt = await baseData.module.makeReactionPrompt();
          break;
        case "cutscenes":
          prompt = await baseData.module.makeCutscenePrompt(input);
          break;
        case "quests":
          prompt = await baseData.module.makeQuestPrompt(input);
          break;
        default:
          return "";
      }
    }

    if (prompt?.length > 0) {
      const newData = { ...currentPrompt };
      newData[type] = prompt;
      setCurrentPrompt(newData);
    }

    handleChange(currentPrompt[type], "output.prompt");
    console.log("returning normal:", currentPrompt[type]);
    return prompt;
  };

  const generateOutputs = async (type) => {
    let selector = "";
    const inputs = dialogue[currentDialogueType][_key].input;
    let res = "";

    if (type === "objectComment") {
      selector = "output.comment";
      const data = inputs.target;
      const obj = getObject(data);
      const description = obj ? obj.description : "";

      const prompt = await getPrompt(type, {
        name: data,
        description,
        type: "Object",
      });
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeCommentStop();
      res = await baseData.module.generateObjectComment(
        makeGenerationFn(prompt, stop)
      );

      handleChange(res.comment, "output.response");
      res = res.comment;
    } else if (type === "npcComment") {
      selector = "output.comment";
      const data = inputs.target;
      const obj = getNPC(data);
      const description = obj ? obj.description : "";

      const prompt = await getPrompt(type, {
        name: data,
        description,
        type: "Character",
      });
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeCommentStop();
      res = await baseData.module.generateNPCComment(
        makeGenerationFn(prompt, stop)
      );

      handleChange(res.comment, "output.response");
      res = res.comment;
    } else if (type === "mobComment") {
      selector = "output.comment";
      const data = inputs.target;
      const obj = getMob(data);
      const description = obj ? obj.description : "";

      const prompt = await getPrompt(type, {
        name: data,
        description,
        type: "Character",
      });
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeCommentStop();
      res = await baseData.module.generateMobComment(
        makeGenerationFn(prompt, stop)
      );

      handleChange(res.comment, "output.response");
      res = res.comment;
    } else if (type === "loadingComment") {
      selector = "output.comment";
      const data = inputs.target;
      const obj = getSetting(data);
      const description = obj ? obj.description : "";

      const prompt = await getPrompt(type, {
        name: data,
        description,
        type: "Location",
      });
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeCommentStop();
      res = await baseData.module.generateLocationComment(
        makeGenerationFn(prompt, stop)
      );

      handleChange(res.comment, "output.response");
      res = res.comment;
    } else if (type === "exposition") {
      selector = "output.comment";
      const data = inputs.target;
      const location =
        entities["location"]?.length > 0
          ? entities["location"][
              Math.floor(Math.random() * entities["location"].length)
            ]
          : { name: "Test", Description: "Test" };

      const _type = getTypeOfObject(data);
      const prompt = await getPrompt(type, {
        name: data,
        location: `${location.name}\n${location.description}`,
        type: _type,
      });
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeExpositionStop(type);
      res = await baseData.module.generateExposition(
        makeGenerationFn(prompt, stop)
      );

      handleChange(res.unparsed, "output.response");
      res = res.parsed;
    } else if (type === "banter") {
      const messages = [];
      const data = inputs;
      const location = getSetting(data.location);
      const chars = data.characters;
      const _npcs = data.npcs;
      const objs = data.objects;

      const characters = [];
      const objects = [];

      for (let i = 0; i < chars.length; i++) {
        characters.push(getCharacter(chars[i]));
      }
      for (let i = 0; i < _npcs.length; i++) {
        characters.push(getNPC(_npcs[i]));
      }
      for (let i = 0; i < objs.length; i++) {
        objects.push(getObject(objs[i]));
      }

      const input = { location, characters, objects, messages };
      const stop = baseData.module.makeBanterStop();
      console.log("input:", input);
      for (let i = 0; i < 3; i++) {
        const prompt = await getPrompt(type, input);
        if (!prompt || prompt?.length <= 0) {
          return;
        }

        res = await baseData.module.generateBanter(
          makeGenerationFn(prompt, stop)
        );
        const newMessages = res.parsed;
        messages.push(...newMessages);
      }

      handleChange(JSON.stringify(res.unparsed), "output.response");

      cleanDialogueMessages(_key);
      for (let i = 0; i < messages.length; i++) {
        addDialogueEntryWithData(_key, messages[i].name, messages[i].message);
      }
      return;
    } else if (type === "rpgDialogue") {
      const messages = [];
      const data = inputs;
      const location = getSetting(data.location);
      const chars = data.characters;
      const _npcs = data.npcs;
      const objs = data.objects;

      const characters = [];
      const objects = [];

      for (let i = 0; i < chars.length; i++) {
        characters.push(getCharacter(chars[i]));
      }
      for (let i = 0; i < _npcs.length; i++) {
        characters.push(getNPC(_npcs[i]));
      }
      for (let i = 0; i < objs.length; i++) {
        objects.push(getObject(objs[i]));
      }

      const input = {
        location,
        character: characters[0],
        characters,
        objects,
        messages,
        dstCharacter: getNPC(_npcs[0]),
      };

      const stop = baseData.module.makeRPGDialogueStop();
      for (let i = 0; i < 6; i++) {
        const prompt = await getPrompt(type, input);
        if (!prompt || prompt?.length <= 0) {
          console.log("invalid prompt:", prompt);
          return;
        }

        res = await baseData.module.generateRPGDialogue(
          makeGenerationFn(prompt, stop)
        );
        const message = res.parsed;
        messages.push(message);
      }

      handleChange(JSON.stringify(res.unparsed), "output.response");

      cleanDialogueMessages(_key);
      for (let i = 0; i < messages.length; i++) {
        addDialogueEntryWithData(_key, messages[i].name, messages[i].message);
      }
      return;
    } else if (type === "reactions") {
      selector = "output.reaction";
      const data = inputs;
      const message = data.messages[0];
      const prompt = await getPrompt(type, null);
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeReactionStop(message.speaker);
      res = await baseData.module.generateReaction(
        makeGenerationFn(prompt, stop)
      );

      handleChange(JSON.stringify(res.unparsed), "output.response");
      res = res.parsed;
    } else if (type === "cutscenes") {
      const messages = [];
      const data = inputs;
      const location = getSetting(data.location);
      const chars = data.characters;
      const _npcs = data.npcs;
      const objs = data.objects;

      const characters = [];
      const npcs = [];
      const objects = [];

      for (let i = 0; i < chars.length; i++) {
        characters.push(getCharacter(chars[i]));
      }
      for (let i = 0; i < _npcs.length; i++) {
        npcs.push(getNPC(_npcs[i]));
      }
      for (let i = 0; i < objs.length; i++) {
        objects.push(getObject(objs[i]));
      }

      const input = {
        location: location,
        npcs: npcs,
        mobs: [],
        characters,
        objects,
        messages,
      };

      const stop = baseData.module.makeCutsceneStop();

      for (let i = 0; i < 3; i++) {
        const prompt = await getPrompt(type, input);
        if (!prompt || prompt?.length <= 0) {
          console.log("invalid prompt:", prompt);
          return;
        }

        res = await baseData.module.generateCutscene(
          makeGenerationFn(prompt, stop)
        );
        const newMessages = res.parsed;
        messages.push(newMessages[0]);
      }

      handleChange(res.prompt, "output.prompt");
      handleChange(JSON.stringify(res.unparsed), "output.response");

      cleanDialogueMessages(_key);
      console.log("MESSAGES:", messages);
      for (let i = 0; i < messages.length; i++) {
        addDialogueEntryWithData(_key, messages[i].name, messages[i].message);
      }
      return;
    } else if (type === "quests") {
      const data = inputs;
      const location = data.location;

      const input = { location: location };
      const prompt = await getPrompt(type, input);
      if (!prompt || prompt?.length <= 0) {
        console.log("invalid prompt:", prompt);
        return;
      }

      const stop = baseData.module.makeQuestStop();
      res = await baseData.module.generateQuest(makeGenerationFn(prompt, stop));

      handleChange(res.parsed.quest, "output.action");
      handleChange(res.parsed.reward, "output.reward");

      handleChange(JSON.stringify(res.unparsed), "output.response");
      return;
    }

    handleChange(res, selector);
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

    if (label === "prompt" || label === "response") {
      return (
        <div>
          <label>
            {label === "prompt" ? "Prompt Preview" : "Prompt Output"}
          </label>
          <textarea
            value={label === "prompt" ? currentPrompt[type] : data}
            readOnly={label === "response"}
            onChange={(e) => {
              const newData = { ...currentPrompt };
              newData[type] = e.target.value;
              setCurrentPrompt(newData);
            }}
          ></textarea>
        </div>
      );
    }

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
            {(
              (type === "exposition"
                ? [
                    ...entities["character"],
                    ...entities["object"],
                    ...entities["location"],
                    ...entities["npc"],
                  ]
                : entities[
                    type.replace("loading", "location").replace("Comment", "")
                  ]) ?? []
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
    else if (
      label === "message" ||
      label === "action" ||
      label === "comment" ||
      label === "reward" ||
      label === "task" ||
      label === "reaction"
    ) {
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
    } else if (label === "location" || label === "npc") {
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

  const saveAsMD = () => {
    console.log(dialogue[currentDialogueType][_key]);
    let md = "# Inputs\n\n";
    const inputs = Object.keys(dialogue[currentDialogueType][_key].input);
    for (const inp of inputs) {
      md += `## ${inp}\n`;
      md += `* ${dialogue[currentDialogueType][_key].input[inp]}\n\n`;
    }
    md += "# Outputs\n\n";
    const outputs = Object.keys(dialogue[currentDialogueType][_key].output);
    for (const out of outputs) {
      md += `## ${out}\n`;
      if (typeof dialogue[currentDialogueType][_key].output[out] === "object") {
        for (const obj of dialogue[currentDialogueType][_key].output[out]) {
          md += `* ${obj.speaker}: ${obj.message}\n`;
        }
        md += "\n";
      } else {
        md += `${dialogue[currentDialogueType][_key].output[out]}\n\n`;
      }
    }

    const element = document.createElement("a");
    const file = new Blob([md], { type: "application/text" });
    element.href = URL.createObjectURL(file);
    element.download =
      currentDialogueType + "_" + _key + "_" + Date.now() + ".md";
    document.body.appendChild(element);
    element.click();
    element.remove();
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
            <div>
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

              <button
                onClick={() => {
                  setEditJson(!editJson);
                }}
              >
                {editJson ? "JSON" : "Text"}
              </button>
            </div>
          ) : (
            <div>
              {DisplayJSONAsEditableForm({
                data: dialogue[currentDialogueType][_key],
                allData: dialogue,
                type,
              })}

              <br />
              <br />
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
              <button
                onClick={() => {
                  generateOutputs(type);
                }}
              >
                Generate
              </button>
              <button onClick={saveAsMD}>Save MD</button>
              <button
                onClick={() => {
                  setEditJson(!editJson);
                }}
              >
                {editJson ? "JSON" : "Text"}
              </button>
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
