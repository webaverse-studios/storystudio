import React, { useContext, useState } from "react";
import { ApplicationContext } from "../Context";
import MonacoEditor from "@monaco-editor/react";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect } from "react";
import { delimiters } from "../utils/constants";
import { makeGenerationFn } from "../utils/generation";
import { isIterable } from "../utils/utils";
import {
  ArrowDown,
  ArrowUp,
  ClearIcon,
  DeleteForever,
} from "../styles/icons/icons";
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
    moveDialogue
  } = useContext(ApplicationContext);

  const [editJson, setEditJson] = useState(true);
  const [lastSelector, setLastSelector] = useState(null);
  const [lastCursor, setLastCursor] = useState(null);
  const [tagsCharacters, setTagsCharacters] = useState([]);
  const [tagObjects, setTagObjects] = useState([]);
  const [tagNPCs, setTagNPCs] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);

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

  useEffect(() => {
    const temp = dialogue[currentDialogueType][_key].output?.prompt;
    if (temp && temp?.length > 0 && temp !== "Prompt") {
      const newData = { ...currentPrompt };
      newData[type] = temp;
      setCurrentPrompt(newData);
    }
  }, [currentDialogueType]);

  const getPrompt = async (type, input) => {
    if (currentPrompt[type]?.length > 0) {
      return currentPrompt[type];
    }

    const temp = dialogue[currentDialogueType][_key].output?.prompt;
    let prompt = "";
    if (temp && temp?.length > 0 && temp !== "Prompt") {
      const newData = { ...currentPrompt };
      newData[type] = temp;
      setCurrentPrompt(newData);
      return temp;
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
          break;
        case "rpgDialogue":
          prompt = await baseData.module.makeRPGDialoguePrompt(input);
          break;
        case "reactions":
          prompt = await baseData.module.makeReactionPrompt(input?.name, input?.message);
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

    handleChange(prompt, "output.prompt");
    return prompt;
  };

  const generateOutputs = async (type) => {
    let selector = "";
    const inputs = dialogue[currentDialogueType][_key].input;
    let res = "";

    if (type === "objectComment") {
      selector = "output.comment";
      const data = inputs.target;
      let obj = getObject(data);
      if (!obj || obj === undefined) {
        obj = { name: data, description: "" };
      }
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
      res = await makeGenerationFn(prompt, stop)();
      res = baseData.module.parseCommentResponse(res);

      handleChange(res, "output.response");
    } else if (type === "npcComment") {
      selector = "output.comment";
      const data = inputs.target;
      let obj = getNPC(data);
      if (!obj || obj === undefined) {
        obj = { name: data, description: "" };
      }
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
      res = await makeGenerationFn(prompt, stop)();
      res = baseData.module.parseCommentResponse(res);

      handleChange(res, "output.response");
    } else if (type === "mobComment") {
      selector = "output.comment";
      const data = inputs.target;
      let obj = getMob(data);
      if (!obj || obj === undefined) {
        obj = { name: data, description: "" };
      }
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
      res = await makeGenerationFn(prompt, stop)();
      res = baseData.module.parseCommentResponse(res);

      handleChange(res, "output.response");
    } else if (type === "loadingComment") {
      selector = "output.comment";
      const data = inputs.target;
      let obj = getSetting(data);
      if (!obj || obj === undefined) {
        obj = { name: data, description: "" };
      }
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
      res = await makeGenerationFn(prompt, stop)();
      res = baseData.module.parseCommentResponse(res);

      handleChange(res, "output.response");
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
      const unparsed = await makeGenerationFn(prompt, stop)();
      res = baseData.module.parseExpositionResponse(unparsed);

      handleChange(unparsed, "output.response");
      res = res;
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
        let _char = getCharacter(chars[i]);
        if (!_char || _char === undefined) {
          _char = { name: chars[i], description: "" };
        }
        _char.bio = _char.description;

        characters.push(_char);
      }
      for (let i = 0; i < _npcs.length; i++) {
        let npc = getNPC(chars[i]);
        if (!npc || npc === undefined) {
          npc = { name: chars[i], description: "" };
        }
        npc.bio = npc.description;

        characters.push(npc);
      }
      for (let i = 0; i < objs.length; i++) {
        let obj = getObject(chars[i]);
        if (!obj || obj === undefined) {
          obj = { name: chars[i], description: "" };
        }

        objects.push(obj);
      }

      const input = { location, characters, objects, messages };
      const prompt = await getPrompt(type, input);
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeBanterStop();
      let unparsed = "";
      for (let i = 0; i < 3; i++) {
        unparsed = await makeGenerationFn(prompt, stop)();
        res = baseData.module.parseBanterResponse(unparsed);
        messages.push(...res);
      }

      handleChange(JSON.stringify(unparsed), "output.response");

      cleanDialogueMessages(_key);
      for (let i = 0; i < messages.length; i++) {
        let found = false;

        for (let j = 0; j < chars.length; j++) {
          if (
            chars[j]?.toLowerCase()?.includes(messages[i].name?.toLowerCase())
          ) {
            messages[i].name = chars[j];
            found = true;
          }
        }
        if (!found) {
          for (let j = 0; j < _npcs.length; j++) {
            if (
              _npcs[j]?.toLowerCase()?.includes(messages[i].name?.toLowerCase())
            ) {
              messages[i].name = _npcs[j];
            }
          }
        }

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
        let _char = getCharacter(chars[i]);
        if (!_char || _char === undefined) {
          _char = { name: chars[i], description: "" };
        }
        _char.bio = _char.description;

        characters.push(_char);
      }
      for (let i = 0; i < _npcs.length; i++) {
        let npc = getNPC(chars[i]);
        if (!npc || npc === undefined) {
          npc = { name: chars[i], description: "" };
        }
        npc.bio = npc.description;

        characters.push(npc);
      }
      for (let i = 0; i < objs.length; i++) {
        let obj = getObject(chars[i]);
        if (!obj || obj === undefined) {
          obj = { name: chars[i], description: "" };
        }

        objects.push(obj);
      }
      const dstCharacter = getNPC(_npcs[0]);
      dstCharacter.bio = dstCharacter.description;

      const input = {
        location,
        character: characters[0],
        characters,
        objects,
        messages,
        dstCharacter,
      };

      const prompt = await getPrompt(type, input);
      if (!prompt || prompt?.length <= 0) {
        console.log("invalid prompt:", prompt);
        return;
      }

      const stop = baseData.module.makeRPGDialogueStop();
      let unparsed = "";
      for (let i = 0; i < 3; i++) {
        unparsed = await makeGenerationFn(prompt, stop)();
        const parsed = baseData.module.parseRPGDialogueResponse(unparsed);
        messages.push(...parsed);
      }

      handleChange(JSON.stringify(unparsed), "output.response");

      cleanDialogueMessages(_key);
      for (let i = 0; i < messages.length; i++) {
        let found = false;

        for (let j = 0; j < chars.length; j++) {
          if (
            chars[j]?.toLowerCase()?.includes(messages[i].name?.toLowerCase())
          ) {
            messages[i].name = chars[j];
            found = true;
          }
        }
        if (!found) {
          for (let j = 0; j < _npcs.length; j++) {
            if (
              _npcs[j]?.toLowerCase()?.includes(messages[i].name?.toLowerCase())
            ) {
              messages[i].name = _npcs[j];
            }
          }
        }

        addDialogueEntryWithData(_key, messages[i].name, messages[i].message);
      }
      return;
    } else if (type === "reactions") {
      selector = "output.reaction";
      const data = inputs;
      const message = data.messages[0];
      const prompt = await getPrompt(type, {
        name: message?.speaker ? message?.speaker : "Scillia",
        message: message?.message ? message?.message : "Hi there!",
      });
      if (!prompt || prompt?.length <= 0) {
        return;
      }

      const stop = baseData.module.makeReactionStop(message.speaker);
      const unparsed = await makeGenerationFn(prompt, stop)();
      res = baseData.module.parseReactionResponse(unparsed);

      handleChange(JSON.stringify(unparsed), "output.response");
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
        let _char = getCharacter(chars[i]);
        if (!_char || _char === undefined) {
          _char = { name: chars[i], description: "" };
        }
        _char.bio = _char.description;

        characters.push(_char);
      }
      for (let i = 0; i < _npcs.length; i++) {
        let npc = getNPC(chars[i]);
        if (!npc || npc === undefined) {
          npc = { name: chars[i], description: "" };
        }
        npc.bio = npc.description;

        npcs.push(npc);
      }
      for (let i = 0; i < objs.length; i++) {
        let obj = getObject(chars[i]);
        if (!obj || obj === undefined) {
          obj = { name: chars[i], description: "" };
        }

        objects.push(obj);
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
      let unparsed = "";

      for (let i = 0; i < 3; i++) {
        const prompt = await getPrompt(type, input);
        if (!prompt || prompt?.length <= 0) {
          console.log("invalid prompt:", prompt);
          return;
        }

        unparsed = await makeGenerationFn(prompt, stop)();
        const parsed = baseData.module.parseCutsceneResponse(unparsed);
        messages.push(...parsed);
      }

      handleChange(unparsed, "output.response");

      cleanDialogueMessages(_key);
      for (let i = 0; i < messages.length; i++) {
        let found = false;

        for (let j = 0; j < chars.length; j++) {
          if (
            chars[j]?.toLowerCase()?.includes(messages[i].name?.toLowerCase())
          ) {
            messages[i].name = chars[j];
            found = true;
          }
        }
        if (!found) {
          for (let j = 0; j < _npcs.length; j++) {
            if (
              _npcs[j]?.toLowerCase()?.includes(messages[i].name?.toLowerCase())
            ) {
              messages[i].name = _npcs[j];
            }
          }
        }

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
      const unparsed = await makeGenerationFn(prompt, stop)();
      res = baseData.module.parseQuestResponse(unparsed);

      handleChange(res.quest, "output.action");
      handleChange(res.reward, "output.reward");

      handleChange(JSON.stringify(unparsed), "output.response");
      return;
    }

    handleChange(res, selector);
  };
  function handleChange(data, selector) {
    console.log(data, selector, dialogue[currentDialogueType][index])
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
            placeholder=""
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
            inputFieldPosition="inline"
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
            <div style={{}} key={index}>
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
              <textarea
                rows={1}
                className="dialogueInputText"
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
                    className={"deleteDialogueMessage"}
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
              <div style={{}} key={index}>
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
    } else if (label === "prompt" || label === "response") {
      return null;
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
          <textarea
            rows={1}
            className="dialogueInputText"
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
      <div className={label} style={{ margin: ".5em" }}>
        {label !== "location" && label !== "speaker"  && label !== "transcript" && label !== "target" && label}
        {output}
      </div>
    );
  }
  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = React.useState(false);

  const saveAsMD = () => {
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
      if (
        typeof dialogue[currentDialogueType][_key].output[out] === "object" &&
        isIterable(dialogue[currentDialogueType][_key].output[out])
      ) {
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
      <button
        className={"showPrompt"}
        onClick={() => {
          setShowPrompt(!showPrompt);
        }}
      >
        {showPrompt ? "Hide Prompt" : "Show Prompt"}
      </button>
      <div className={"entityUpDown"}>
        <button onClick={() => { const data = dialogue[[currentDialogueType][_key]][index]; data.type = type; moveDialogue(data, true); }}>
          <ArrowUp />
        </button>
        <button onClick={() => { const data = dialogue[[currentDialogueType][_key]][index]; data.type = type; moveDialogue(data, false); }}>
          <ArrowDown />
        </button>
      </div>
      {!showPrompt && typeof dialogue[currentDialogueType][_key] === "object" && (
        <React.Fragment>
          {!editJson ? (
            <div className="dialogueBody">
              <MonacoEditor
                width="100%"
                height="90vh"
                language="json"
                theme="light"
                onMount={(editor) => {
                  setTimeout(function () {
                    const formatAcction = editor.getAction(
                      "editor.action.formatDocument"
                    );
                    if (formatAcction) {
                      formatAcction.run();
                    }
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
            <div className="dialogueBody">
              <label>Input</label>
              <div className="dialogueInput">
                {DisplayJSONAsEditableForm({
                  data: dialogue[currentDialogueType][_key].input,
                  allData: dialogue,
                  type,
                })}
              </div>
              <label>Output</label>
              <div className="dialogueOutput">
                {DisplayJSONAsEditableForm({
                  data: dialogue[currentDialogueType][_key].output,
                  allData: dialogue,
                  type,
                })}
                {(type === "rpgDialogue" ||
                  type === "banter" ||
                  type === "cutscenes") && (
                    <button
                      className={"addMessage"}
                      onClick={() => {
                        addDialogueEntry(_key);
                      }}
                    >
                      Add Message
                    </button>
                  )}
              </div>
              {/* <button onClick={saveAsMD}>Save MD</button> 
              <button
                onClick={() => {
                  setEditJson(!editJson);
                }}
              >
                {editJson ? "JSON" : "Text"}
              </button>
              */}
            </div>
          )}
        </React.Fragment>
      )}
      {showPrompt &&
        <div className="dialogPromptView">
          <div className="dialogPromptViewPreview">
            <label>Prompt Preview</label>
            <textarea
              rows={1}
              value={dialogue[currentDialogueType][_key]["output"]["prompt"]}
              readOnly={false}
              onChange={(e) => {
                const newData = { ...currentPrompt };
                newData[type] = e.target.value;
                setCurrentPrompt(newData);
              }}
            />
          </div>
          <div className="dialogPromptViewResponse">
            <label>Prompt Output</label>
            <textarea
              rows={1}
              value={dialogue[currentDialogueType][_key]['output']["response"]}
              readOnly={true}
              onChange={(e) => {
                const newData = { ...currentPrompt };
                newData[type] = e.target.value;
                setCurrentPrompt(newData);
              }}
            />
          </div>
        </div>
      }
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
      </div>
      <button
        className={"generateButton"}
        onClick={() => {
          generateOutputs(type);
        }}
      >
        Generate
      </button>
    </div>
  );
};

export default Dialogue;