import axios from "axios";
import React, { useEffect } from "react";
import "./App.css";
import { getOpenAIKey, setOpenAIKey } from "./utils/openai_utils";
import { lore_header } from "./lore_header";

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

export async function download_content(url) {
  const file = await axios.get(url);
  return file.data;
}

const Header = ({ data, setData, exportHandler, importHandler }) => {
  const handleLoad = async (data, fromUrl = true) => {
    if (fromUrl) {
      const response = await download_content(data.url)
      let blob = new Blob([response], { type: "application/x-javascript;base64" });
      // decode blob to a string
      const reader = new FileReader();
      reader.readAsText(blob);
      reader.onload = async function () {
        let content = reader.result;
        // find the line in content (a long delimited string) that contains import and murmurhash3
        // replace that line with lore_header
        const contentArray = content.split('\n');
        const importLineIndex = contentArray.findIndex(line => line.includes('murmurhash3.js'));
        if(importLineIndex !== -1) {
          contentArray[importLineIndex] = lore_header;
          content = contentArray.join('\n');
          console.log('injected content', content);
          // convert content back to a blob with the x-javascript base64 type
          blob = new Blob([content], { type: "application/x-javascript;base64" });
        }

        const fileUri = await fileToDataUri(blob);
        // fileUri is a base64 javascript document
        // we want to inject some code into the file before we 
        const importedFile = await import(fileUri);
        setData({ base: fileUri, type: "file", funcs: importedFile, url: data.url });
      }
    } else {
      // open a file picker and get the file from disk
      const file = await getFile();
      const fileUri = await fileToDataUri(file);
      const importedFile = await import(fileUri);
      setData({ base: fileUri, type: "file", funcs: importedFile, url: file.name });
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

  useEffect(() => { handleLoad (data) }, [])

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
            value={data.url}
            onChange={(e) => setData({...data, url: e.target.value})}
            onFocus={(e) => setData({...data, url: e.target.value})}
          />
          <button className={"baseButton baseButtonUrl"} onClick={() => handleLoad(data, true)}>
            [From URL]
          </button>
          <button
            className={"baseButton baseButtonFile"}
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
