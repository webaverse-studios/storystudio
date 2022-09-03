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
  const [showEditor, setShowEditor] = useState(false);

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
    const importedFile = await import(fileUri /* @vite-ignore */);
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

  const generateEntityCallback = async (entityType, data) => {
    setGenerating(true);
    console.log("baseData is", baseData);
    const entity = { info: "new " + entityType };

    if (!entity.id) {
      entity.id = makeId(5);
    }

    const newEntityData = { ...loreData };

    newEntityData[currentContentType].examples.unshift(entity);

    setLoreData(newEntityData);
    setGenerating(false);
  };
  const deleteEntityCallback = (entity, index) => {
    const newData = { ...loreData };
    if (index < 0) {
      return;
    }

    newData[currentContentType].examples.splice(index, 1);

    setLoreData(newData);
  };

  const moveEntityCallback = (data, up) => {
    const newLore = { ...loreData };
    const newLoreData = { ...newLore[currentContentType] };
    const newLoreExamples = [...newLoreData.examples];

    const index = newLoreExamples.findIndex((e) => e === data);
    if (index === null || index === undefined || index <= -1) {
      return;
    }

    if (newLoreExamples?.length <= 1) {
      return;
    }

    if (index === 0 && up) {
      newLoreExamples.push(newLoreExamples.shift());
    } else if (index === newLoreExamples.length - 1 && !up) {
      newLoreExamples.unshift(newLoreExamples.pop());
    } else {
      const newIndex = up ? index - 1 : index + 1;
      if (newIndex > newLoreExamples.length - 1 || newIndex < 0) {
        return;
      }
      const temp = newLoreExamples[index];
      newLoreExamples[index] = newLoreExamples[newIndex];
      newLoreExamples[newIndex] = temp;
    }

    newLoreData.examples = newLoreExamples;
    newLore[currentContentType] = newLoreData;
    setLoreData(newLore);
  };

  const editEntityCallback = (entity, index) => {
    let newData = { ...loreData };

    if (index < 0) {
      return;
    }

    newData[currentContentType].examples[index] = entity;

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
              generateEntityCallback={(data) => {
                console.log("generateEntityCallback", data);
                generateEntityCallback(currentContentType, data);
              }}
              editEntityCallback={(data, index) =>
                editEntityCallback(data, index)
              }
              deleteEntityCallback={(data, index) =>
                deleteEntityCallback(data, index)
              }
              moveEntityCallback={(data, up) => moveEntityCallback(data, up)}
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
              value={baseData && baseData.url}
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
          Import All
        </button>
        <button
          className={"exportButton"}
          onClick={() => (!showEditor ? exportHandler() : saveLoreFile())}
        >
          Export All
        </button>
      </div>
    </div>
  );
}

export default LoreBase;
