import React, { useEffect } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../Context";
import "../styles/App.css";
import { WithContext as ReactTags } from "react-tag-input";
import { delimiters } from "../utils/constants";

export const DisplayJSONAsEditableForm = ({
  data,
  allData,
  type,
  tags,
  _key,
  lastSelector,
  setLastSelector,
  setLastCursor,
  handleChange,
  label = "",
  selector = "",
}) => {
  const { entities, dialogue, currentDialogueType } =
    useContext(ApplicationContext);

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
              ? tags.tagsCharacters
              : label === "objects"
              ? tags.tagObjects
              : tags.tagNPCs
          }
          suggestions={
            label === "characters"
              ? tags.suggestionsCharacters
              : label === "objects"
              ? tags.suggestionsObjects
              : tags.suggestionsNPCs
          }
          delimiters={delimiters}
          handleDelete={
            label === "characters"
              ? tags.handleDeleteCharacter
              : label === "objects"
              ? tags.handleDeleteObject
              : tags.handleDeleteNPC
          }
          handleAddition={
            label === "characters"
              ? tags.handleAddCharacter
              : label === "objects"
              ? tags.handleAddObject
              : tags.handleAddNPC
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
              handleChange={handleChange}
              lastSelector={lastSelector}
              setLastSelector={setLastSelector}
              setLastCursor={setLastCursor}
              _key={_key}
              selector={selector + (selector !== "" ? "." : "") + index}
              tags={tags}
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
                _key={_key}
                handleChange={handleChange}
                label={key}
                data={data[key]}
                lastSelector={lastSelector}
                setLastSelector={setLastSelector}
                setLastCursor={setLastCursor}
                allData={allData}
                selector={selector + (selector !== "" ? "." : "") + key}
                tags={tags}
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
      {label !== "location" &&
        label !== "speaker" &&
        label !== "transcript" &&
        label !== "target" &&
        label}
      {output}
    </div>
  );
};

export default DisplayJSONAsEditableForm;
