import React from "react";
import "./App.css";
import { getOpenAIKey, setOpenAIKey } from "./utils/openai_utils";

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

const Header = ({ data, setData, exportHandler, importHandler }) => {
  const handleLoad = async (data, fromUrl = true) => {
    if (fromUrl) {
      const response = await fetch(
        "https://github.com/webaverse/lore/blob/main/lore-model.js"
      );
      const fileUri = await fileToDataUri(base.base);
      const importedFile = await import(fileUri);
      setData({ base: fileUri, type: "file", funcs: importedFile });
    } else {
      // open a file picker and get the file from disk
      const file = await getFile();
      const fileUri = await fileToDataUri(file);
      const importedFile = await import(fileUri);
      setData({ base: fileUri, type: "file", funcs: importedFile });
    }
  };

  const importJson = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    importHandler(json);
  };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="logo" width="48px" height="48px" />
        <h1>Story Studio</h1>
      </div>
      <div className="headerright">
        <div className={"base"}>
          <span className={"baseLabel"}>Base: </span>
          <input
            className={"baseInput"}
            type="text"
            value={data.base}
            onChange={(e) => setData(e.target.value)}
            onFocus={(e) => setData(e.target.value)}
          />
          <button className={"baseButton"} onClick={() => handleLoad(data)}>
            [From URL]
          </button>
          <button
            className={"baseButton"}
            onClick={() => handleLoad(data, false)}
          >
            [From Disk]
          </button>
        </div>
        <div className={"openai"}>
          <span className={"baseLabel"}>OpenAI Key: </span>
          <input
            className={"baseInput"}
            type="input"
            defaultValue={getOpenAIKey()}
            onChange={(e) =>
              console.log("change", e.target.value) ||
              setOpenAIKey(e.target.value)
            }
            onFocus={(e) => setOpenAIKey(e.target.value)}
          />
        </div>
        <div className={"importExportButtons"}>
          <button className={"importButton"} onClick={() => importJson()}>
            Import
          </button>
          <button className={"exportButton"} onClick={() => exportHandler()}>
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
