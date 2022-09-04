import React, { useEffect, useState } from "react";
import { getFile } from "./components/getFile";
import "./styles/App.css";
import {
  defaultIngredients, defaultOpenAIParams, dialogueTypes, defaultDialogue, exampleLoreFiles, lore, views
} from "./utils/constants";
import murmurhash3String from "./utils/murmurhash3string";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Route, Routes } from "react-router";
import {ApplicationContext} from './Context';
import {
  compressObject,
  decompressObject,
  download_content,
  fileToDataUri
} from "./utils/utils"



function setOpenAIKey(newKey) {
    localStorage.setItem("openai_key", newKey);
  }
  
function getOpenAIKey() {
    return localStorage.getItem("openai_key");
}

export function ApplicationContextProvider(props) {

    if (!localStorage.getItem("ingredients")) {
        localStorage.setItem("ingredients", compressObject(defaultIngredients));
      }
      
      if (!localStorage.getItem("dialogue")) {
        localStorage.setItem("dialogue", compressObject(defaultDialogue));
      }
      
      const storedEntityData = decompressObject(localStorage.getItem("ingredients"));
      const storedDialogueData = decompressObject(localStorage.getItem("dialogue"));
      
        const [currentView, setCurrentView] = useState(
          localStorage.getItem("currentView") || Object.keys(views)[0]
        );
        const [ingredients, setIngredients] = useState(storedEntityData);
        const [dialogue, setDialogue] = useState(storedDialogueData);
        const [currentDialogueType, setCurrentDialogueType] = useState(dialogueTypes[0]);
      
        const [loreFiles, setLoreFiles] = useState(
          localStorage.getItem("loreFiles")
            ? decompressObject(localStorage.getItem("loreFiles"))
            : exampleLoreFiles
        );
        const [loreData, setLoreData] = useState(
          localStorage.getItem("loreData")
            ? decompressObject(localStorage.getItem("loreData"))
            : lore
        );
        const [loreHeader, setLoreHeader] = useState("");
        const [baseData, setBaseData] = useState({
          base: null,
          url: "./lore-model.js", // "https://webaverse.github.io/lore/lore-model.js",
          type: "url",
          module: {},
        });
        const [errorDialogData, setErrorDialogData] = useState({
          on: false,
          msg: "",
        });
        const [forceUpdate, setForceUpdate] = useState(false);
        const [openAIParams, setOpenAIParams] = useState(defaultOpenAIParams);
        const [darkMode, setDarkMode] = useState(false);
      
        const updateOpenAIParams = (data) => {
          if (typeof data.top_p === "string") {
            data.top_p = parseFloat(data.top_p);
          }
          if (typeof data.temperature === "string") {
            data.temperature = parseFloat(data.temperature);
          }
          if (typeof data.frequency_penalty === "string") {
            data.frequency_penalty = parseFloat(data.frequency_penalty);
          }
          if (typeof data.presence_penalty === "string") {
            data.presence_penalty = parseFloat(data.presence_penalty);
          }
          if (typeof data.max_tokens === "string") {
            data.max_tokens = parseInt(data.max_tokens);
          }
          if (typeof data.best_of === "string") {
            data.best_of = parseInt(data.best_of);
          }
      
          setOpenAIParams(data);
          localStorage.setItem("openAIParams", JSON.stringify(data));
        };
      
        const updateDarkMode = () => {
          setDarkMode(!darkMode);
          localStorage.setItem("darkMode", darkMode);
          globalThis.darkMode = darkMode;
        };
      
        useEffect(() => {
          localStorage.setItem("loreFiles", compressObject(loreFiles));
        }, [loreFiles]);
      
        useEffect(() => {
          const dm = localStorage.getItem("darkMode");
          if (dm && dm?.length > 0) {
            setDarkMode(dm.toLocaleLowerCase().trim() === "true");
            globalThis.darkMode = darkMode;
          }
      
          const oap = localStorage.getItem("openAIParams");
          if (oap && oap !== "[object Object]" && oap?.length > 0) {
            setOpenAIParams(JSON.parse(oap));
          }
      
          const data = localStorage.getItem("baseData")
            ? JSON.parse(localStorage.getItem("baseData"))
            : baseData;
      
          console.log("loaded default data");
          loadBaseData(data, false, !baseData.base);
        }, []);
      
        // useEffect(() => {
        //   if(baseData) localStorage.setItem('baseData', JSON.stringify(baseData));
        // }, [baseData])
      
        useEffect(() => {
          localStorage.setItem("currentView", currentView);
        }, [currentView]);
      
        useEffect(() => {
          localStorage.setItem("ingredients", compressObject(ingredients));
        }, [ingredients]);
      
        useEffect(() => {
          localStorage.setItem("loreData", compressObject(loreData));
        }, [loreData]);
      
        const handleImport = (type, data) => {
          if (type === "ingredients") {
            setIngredients(data);
          } else if (type === "lore") {
            console.log("setLoreData:", data);
            setLoreData(data);
            console.log("lore Data:", loreData);
          } else {
            setLoreFiles(data);
          }
        };
      
        const loadBaseData = async (data, callback, fromUrl = true) => {
          const loreHeader = "export let lore = " + JSON.stringify(loreData) + "\n";
          // convert to string
          const murmurHashImportString = `import {murmurhash3} from './murmurhash3.js';`;
      
          let content, displayContent;
          function end() {
            setLoreHeader(loreHeader);
            if (callback) callback(displayContent);
          }
          if (fromUrl) {
            console.log("**** loading from url ****");
            const response = await download_content(data.url);
            let blob = new Blob([response], {
              type: "application/x-javascript;base64",
            });
            // decode blob to a string
            const reader = new FileReader();
            reader.readAsText(blob);
            reader.onload = async function () {
              content = reader.result;
              // separate the content into an array of lines
              const lines = content.split("\n");
              // get the index of any line that includes the text LORE_HEADER
      
              if (content.includes(murmurHashImportString)) {
                content = content.replace(murmurHashImportString, murmurhash3String);
                displayContent = content;
                console.log("replace content is", content);
              } else {
                const headerStartIndex = lines.findIndex((line) =>
                  line.includes("LORE_HEADER_START")
                );
                const headerEndIndex = lines.findIndex((line) =>
                  line.includes("LORE_HEADER_END")
                );
                // remove the array values including and between headerStartIndex and headerEndIndex
                const beforeHeader = lines.slice(-1, headerStartIndex);
                content =
                  beforeHeader +
                  lines.splice(headerEndIndex + 1, lines.length).join("\n");
                // find the line in content (a long delimited string) that contains import and murmurhash3
                // replace that line with loreHeader
                if (!content.includes("export let lore = ")) {
                  content = loreHeader + "\n" + content;
                }
                displayContent = content;
              }
      
              // convert content back to a blob with the x-javascript base64 type
              blob = new Blob([content], {
                type: "application/x-javascript;base64",
              });
      
              const fileUri = await fileToDataUri(blob);
              // fileUri is a base64 javascript document
              // we want to inject some code into the file before we
              console.log('File URI is ', fileUri);
              const importedFile = await import(fileUri);
              const firstLine = content.split("\n")?.[0];
      
              if (firstLine && firstLine.startsWith("export let lore = ")) {
                const json = firstLine.replace("export let lore = ", "");
                const obj = JSON.parse(json);
                setLoreData(obj);
                console.log("updated lore data");
              }
      
              setBaseData({
                base: fileUri,
                type: "file",
                module: importedFile,
                url: data.url,
              });
              localStorage.setItem(
                "baseData",
                JSON.stringify({
                  base: fileUri,
                  type: "file",
                  module: "",
                  url: data.url,
                })
              );
              end();
            };
          } else {
            console.log("**** loading from file ****");
            // open a file picker and get the file from disk
            const file = await getFile();
            // read the file as text
            content = await file.text();
            const lines = content.split("\n");
            // get the index of any line that includes the text LORE_HEADER
      
            if (content.includes(murmurHashImportString)) {
              content = content.replace(murmurHashImportString, murmurhash3String);
              displayContent = content;
              console.log("replace content is", content);
            } else {
              const headerStartIndex = lines.findIndex((line) =>
                line.includes("LORE_HEADER_START")
              );
              const headerEndIndex = lines.findIndex((line) =>
                line.includes("LORE_HEADER_END")
              );
              // remove the array values including and between headerStartIndex and headerEndIndex
              const beforeHeader = lines.slice(-1, headerStartIndex + 1);
              content =
                beforeHeader +
                lines.splice(headerEndIndex + 1, lines.length).join("\n");
              // find the line in content (a long delimited string) that contains import and murmurhash3
              // replace that line with loreHeader
              if (!content.includes("export let lore = ")) {
                content = loreHeader + "\n" + content;
              }
              displayContent = content;
            }
      
            // convert text to a blob with the x-javascript base64 type
            const blob = new Blob([content], {
              type: "application/x-javascript;base64",
            });
            const fileUri = await fileToDataUri(blob);
            const importedFile = await import(fileUri);
            const firstLine = content.split("\n")?.[0];
      
            if (firstLine && firstLine.startsWith("export let lore = ")) {
              const json = firstLine.replace("export let lore = ", "");
              const obj = JSON.parse(json);
              setLoreData(obj);
            }
            setBaseData({
              base: fileUri,
              type: "file",
              module: importedFile,
              url: file.name,
            });
            localStorage.setItem(
              "baseData",
              JSON.stringify({
                base: fileUri,
                type: "file",
                module: "",
                url: file.name,
              })
            );
            end();
          }
        };
      
        const handleExport = (type) => {
          const json = JSON.stringify(
            type === "ingredients"
              ? ingredients
              : type === "lore"
                ? loreData
                : loreFiles
          );
      
          const element = document.createElement("a");
          const file = new Blob([json], { type: "application/json" });
          element.href = URL.createObjectURL(file);
          element.download = type + "_" + new Date().getTime() + ".json";
          document.body.appendChild(element);
          element.click();
          element.remove();
        };
      
        const openErrorModal = (msg) => {
          setErrorDialogData({ on: true, msg: msg });
        };
        const closeErrorDialog = () => {
          setErrorDialogData({ on: false, msg: "" });
        };
      
        const _forceUpdate = () => {
          setForceUpdate(!forceUpdate);
        };
    

        const provider = {
            getOpenAIKey: () => getOpenAIKey(),
            setOpenAIKey: key => setOpenAIKey(key),
            errorDialogData,
            openAIParams,
            setOpenAIParams,
            dialogue,
            setDialogue,
            currentDialogueType,
            setCurrentDialogueType,
            ingredients,
            setIngredients
        }


    return (
        <ApplicationContext.Provider
            value={provider}
        >
            {props.children}
        </ApplicationContext.Provider>
    );
}