import React from "react";
import "./App.css";
import { getOpenAIKey, setOpenAIKey } from "./utils/openai_utils";

async function getFile() {
  // get a file from the local user's computer and return the File object
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
      const response = await fetch(data.base);
      const json = await response.json();
      setData({ base, type: "url", json });
    } else {
      // open a file picker and get the file from disk
      const file = await getFile();
      // read the file as text
      const text = await file.text();
      // parse the text as JSON
      const json = JSON.parse(text);
      setData({ base: file.name, type: "file", json });
    }
  };

  const importJson = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    importHandler(json);
  };

  return (
    <div className="header">
      <div className="logo">
        <h1>Webaverse</h1>
        <h2>Story Studio</h2>
      </div>
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
  );
};

export default Header;
