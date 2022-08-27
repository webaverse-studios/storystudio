import axios from "axios";
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { lore } from "./constants";
import ListBox from "./ListBox";
import Context from "./ContextSelector";
import "./App.css";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

if (
  !localStorage.getItem("examples") ||
  localStorage.getItem("examples") === "[object Object]"
) {
  localStorage.setItem("examples", JSON.stringify(lore));
}


async function getFile() {
  const file = await new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      resolve(e.target.files[0]);
    };
    input.click();
  });
  return file;
}

async function download_content(url) {
  const file = await axios.get(url);
  return file.data;
}
function LoreBase({data, setData, examples, setExamples, exportHandler, importHandler}) {
  const [editorCode, setEditorCode] = useState("");
  const [loreHeader, setLoreHeader] = useState("");

  const handleLoad = async (data, fromUrl = true) => {
    const loreHeader = await download_content("./lore_header.js");
    setLoreHeader(loreHeader);
    if (fromUrl) {
      const response = await download_content(data.url);
      let blob = new Blob([response], {
        type: "application/x-javascript;base64",
      });
      // decode blob to a string
      const reader = new FileReader();
      reader.readAsText(blob);
      reader.onload = async function () {
        let content = reader.result;
        updateEditorCode(content);
        // find the line in content (a long delimited string) that contains import and murmurhash3
        // replace that line with loreHeader
        content = loreHeaderString + content;
        // convert content back to a blob with the x-javascript base64 type
        blob = new Blob([content], {
          type: "application/x-javascript;base64",
        });

        const fileUri = await fileToDataUri(blob);
        // fileUri is a base64 javascript document
        // we want to inject some code into the file before we
        const importedFile = await import(fileUri);
        setData({
          base: fileUri,
          type: "file",
          module: importedFile,
          url: data.url,
        });
      };
    } else {
      // open a file picker and get the file from disk
      const file = await getFile();
      // read the file as text
      let text = await file.text();
      updateEditorCode(text);
      text = loreHeader + '\n' + text;
      // convert text to a blob with the x-javascript base64 type
      const blob = new Blob([text], {
        type: "application/x-javascript;base64",
      });
      const fileUri = await fileToDataUri(blob);
      const importedFile = await import(fileUri);
      setData({
        base: fileUri,
        type: "file",
        module: importedFile,
        url: file.name,
      });
    }
  };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    const codeEditorData = localStorage.getItem('codeEditorData');
    if (codeEditorData) {
      setEditorCode(codeEditorData);
      download_content("./lore_header.js").then(loreHeader => setLoreHeader(loreHeader));
    }
    else {
      handleLoad(data);
    }
  }, []);


  // editorCode is a string
  // if the user presses ctrl + s, create a new file from the editorCode text, get the URI and call setData
  const handleSave = async () => {
    if (!editorCode) return;
    console.log('saving')
    const blob = new Blob([loreHeader + '\n' + editorCode], {
      type: "application/x-javascript;base64",
    });
    const fileUri = await fileToDataUri(blob);
    const importedFile = await import(fileUri);
    setData({
      base: fileUri,
      type: "file",
      module: importedFile,
      url: "new file",
    });
    return fileUri;
  }


  let isSaving = false;
  const updateEditorCode = (value) => {
    if (!isSaving) {
      isSaving = true;
      handleSave().then(() => {
        isSaving = false;
      });
    }
    setEditorCode(value);
    localStorage.setItem('codeEditorData', value);
  }

  const saveLoreFile = async () => {
    const file = await handleSave();
    // save the file to disk as lore-model.js
    const link = document.createElement("a");
    link.href = file;
    link.download = "lore-model.js";
    link.click();
  }

  const [currentContentType, setCurrentContentType] = useState(Object.keys(lore)[0]);

  const addEntityCallback = async (
    entityType,
    data,
    setGenerating,
    tries = 0
  ) => {
    if (tries > 5) {
      console.error("Could not generate entity");
      return;
    }
    tries++;
    setGenerating(true);
    try {
      //console.log("calling baseData", baseData);
      // generate new using openai callback
      let entity = await generate(entityType, data, baseData);
      if (entity[0]) entity = entity[0];
      console.log("generate entity", entity);
      if (!entity.id) {
        entity.id = makeId(5);
      }
      if (!entity || entity === undefined) {
        addEntityCallback(entityType, data, setGenerating, tries);
        return;
      }

      const newEntityData = { ...examples };

      newEntityData[currentContentType].push(entity);

      setExamples(newEntityData);
    } catch (e) {
      console.error(e);
      addEntityCallback(entityType, data, setGenerating, tries);
    }
    setGenerating(false);
  };
  const deleteEntityCallback = (entity) => {
    const newData = { ...examples };
      newData[entity.type] = examples[entity.type].filter(
        (e) => e.id !== entity.id
      );

    setExamples(newData);
  };

  const editEntityCallback = (entity) => {
    let newData = { ...examples };

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

    setExamples(newData);
  };

  const handleImport = (data) => {
    setExamples(data);
  };

  const handleExport = () => {
    const json = JSON.stringify(examples);
    console.log(json);

    const element = document.createElement("a");
    const file = new Blob([json], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download =
      uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2,
      }) + ".json";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const importJson = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    importHandler(json);
  };

  return (
    <div className="view">
      <div className={"base"}>
        <span className={"baseLabel"}>Base: </span>
        <input
          className={"baseInput"}
          type="text"
          value={data.url}
          onChange={(e) => setData({ ...data, url: e.target.value })}
          onFocus={(e) => setData({ ...data, url: e.target.value })}
        />
        <button
          className={"baseButton baseButtonUrl"}
          onClick={() => handleLoad(data, true)}
        >
          [Open URL]
        </button>
        <button
          className={"baseButton baseButtonFile"}
          onClick={() => handleLoad(data, false)}
        >
          [Open File]
        </button>
        <button
          className={"baseButton baseButtonFile"}
          onClick={() => saveLoreFile()}
        >
          [Export]
        </button>
      </div>
    <div className="sections">
      {/*<Context
        data={examples}
        currentContentType={currentContentType}
        setCurrentContentType={setCurrentContentType}
  />
      <ListBox
        type={"lorebase"}
        data={examples[currentContentType]}
        header={"lorebase"}
        addEntityCallback={(data, setGenerating) => {
          addEntityCallback("lorebase", examples, setGenerating);
        }}
        editEntityCallback={(data) => editEntityCallback(data)}
        deleteEntityCallback={(data) => deleteEntityCallback(data)}
        showLabels={true}
      />*/}
    </div>
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="light"
        value={editorCode}
        onChange={(value) => { updateEditorCode(value); }}
      />
    </div>
  );
};

export default LoreBase;
