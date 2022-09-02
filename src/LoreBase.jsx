import axios from "axios";
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { lore } from "./constants";
import ListBox from "./ListBox";
import { generate } from "./utils/generation";
import Context from "./ContextSelector";
import "./App.css";
import { getFile } from "./getFile";
import {
  compressObject,
  decompressObject,
  download_content,
  fileToDataUri,
  makeId,
} from "./utils/utils";

if (
  !localStorage.getItem("loreData") ||
  decompressObject(localStorage.getItem("loreData")) === "[object Object]"
) {
  localStorage.setItem("loreData", compressObject(lore));
}

function LoreBase({
  baseData,
  loreHeader,
  setLoreHeader,
  loadBaseData,
  setBaseData,
  loreData,
  setLoreData,
  exportHandler,
  importHandler,
}) {
  const [editorCode, setEditorCode] = useState("");
  const [currentContentType, setCurrentContentType] = useState(
    Object.keys(lore)[0]
  );
  const [generating, setGenerating] = useState(false);
  const [showEditor, setShowEditor] = useState(true);

  useEffect(() => {
    const codeEditorData = localStorage.getItem("codeEditorData");
    if (codeEditorData) {
      setEditorCode(codeEditorData);
      setLoreHeader(loreHeader);
    } else {
      loadBaseData(baseData);
    }
  }, []);

  // editorCode is a string
  // if the user presses ctrl + s, create a new file from the editorCode text, get the URI and call setBaseData
  const handleSave = async () => {
    const blob = new Blob(
      [
        (editorCode.includes("export let lore = ")
          ? ""
          : "export let lore = " + JSON.stringify(loreData) + "\n") +
          editorCode,
      ],
      {
        type: "application/x-javascript;base64",
      }
    );
    const fileUri = await fileToDataUri(blob);
    const importedFile = await import(fileUri/* @vite-ignore */);
    setBaseData({
      base: fileUri,
      type: "file",
      module: importedFile,
      url: "new file",
    });
    return fileUri;
  };

  let isSaving = false;
  const updateEditorCode = (value) => {
    localStorage.setItem("codeEditorData", value);
    setEditorCode(value);
    if (!isSaving) {
      isSaving = true;
      handleSave().then(() => {
        isSaving = false;
      });
    }
  };

  const saveLoreFile = async () => {
    console.log("save_lore_file");
    const file = await handleSave();
    // save the file to disk as lore-model.js
    const link = document.createElement("a");
    link.href = file;
    link.download = "lore-model.js";
    link.click();
  };

  const addEntityCallback = async (entityType, data) => {
    setGenerating(true);
    console.log("baseData is", baseData);
    let entity = await generate(entityType, data, baseData);

    if (!entity.id) {
      entity.id = makeId(5);
    }

    const newEntityData = { ...loreData };

    newEntityData[currentContentType].push(entity);

    setLoreData(newEntityData);
    setGenerating(false);
  };
  const deleteEntityCallback = (entity) => {
    const newData = { ...loreData };
    newData[entity.type] = loreData[entity.type].filter(
      (e) => e.id !== entity.id
    );

    setLoreData(newData);
  };

  const editEntityCallback = (entity) => {
    let newData = { ...loreData };

    if (entity.message !== undefined) {
      newData[currentContentType];

      const entityIndex = newData[currentContentType].findIndex(
        (e) => e.id === entity.id
      );
      newData[currentContentType][entityIndex] = entity;
    } else {
      const entityIndex = newData[entity.type].findIndex(
        (e) => e.id === entity.id
      );
      newData[entity.type][entityIndex] = entity;
    }

    setLoreData(newData);
  };

  const importJson = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    importHandler(json);
  };
  return (
    <div className="view">
      <React.Fragment>
        <div className={"importExportButtons"}>
          <button
            className={"modeButton" + (showEditor ? " active" : "")}
            onClick={() => setShowEditor(!showEditor)}
          >
            Edit Pipeline JS
          </button>
          <button
            className={"importButton"}
            onClick={() =>
              !showEditor
                ? importJson()
                : loadBaseData(baseData, updateEditorCode, false)
            }
          >
            Import
          </button>
          <button
            className={"exportButton"}
            onClick={() => (!showEditor ? exportHandler() : saveLoreFile())}
          >
            Export
          </button>
        </div>
        {!showEditor && (
          <div className="sections">
            <Context
              data={loreData}
              currentContentType={currentContentType}
              setCurrentContentType={setCurrentContentType}
            />
            <ListBox
              type={"lorebase"}
              data={loreData[currentContentType].examples}
              header={"lorebase"}
              addEntityCallback={(data) => {
                console.log("addEntityCallback", data);
                addEntityCallback(currentContentType, data);
              }}
              editEntityCallback={(data) => editEntityCallback(data)}
              deleteEntityCallback={(data) => deleteEntityCallback(data)}
              showLabels={true}
            />
          </div>
        )}
      </React.Fragment>
      {showEditor && (
        <React.Fragment>
          <div className={"base"}>
            <span className={"baseLabel"}>Base: </span>
            <input
              className={"baseInput"}
              type="text"
              value={baseData?.url}
              onChange={(e) =>
                setBaseData({ ...baseData, url: e.target.value })
              }
              onFocus={(e) => setBaseData({ ...baseData, url: e.target.value })}
            />
            <button
              className={"baseButton baseButtonUrl"}
              onClick={() => loadBaseData(baseData, updateEditorCode, true)}
            >
              [Open URL]
            </button>
          </div>
          <MonacoEditor
            width="100%"
            height="100%"
            language="javascript"
            theme="light"
            value={editorCode}
            onChange={(value) => {
              updateEditorCode(value);
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default LoreBase;
