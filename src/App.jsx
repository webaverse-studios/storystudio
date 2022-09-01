import { useEffect, useState } from "react";
import "./App.css";
import {
  defaultIngredients,
  exampleLoreFiles,
  views,
  lore,
  defaultOpenAIParams,
} from "./constants";
import Header from "./Header";
import Ingredients from "./Ingredients";
import Setup from "./Setup";
import MapView from "./Map";
import LoreFiles from "./LoreFiles";
import LoreBase from "./LoreBase";
import murmurhash3String from "./murmurhash3string";
import { getFile } from "./getFile";
import ErrorModal from "./ErrorModal";
import {
  compressObject,
  decompressObject,
  download_content,
  fileToDataUri,
} from "./utils/utils";

if (
  !localStorage.getItem("ingredients") ||
  decompressObject(localStorage.getItem("ingredients")) === "[object Object]"
) {
  localStorage.setItem("ingredients", compressObject(defaultIngredients));
}
const storedEntityData = decompressObject(localStorage.getItem("ingredients"));

function App() {
  const [currentView, setCurrentView] = useState(
    localStorage.getItem("currentView") || Object.keys(views)[0]
  );
  const [ingredients, setIngredients] = useState(storedEntityData);
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
  const [baseData, setBaseData] = useState(
    localStorage.getItem("baseData")
      ? decompressObject(localStorage.getItem("baseData"))
      : {
          base: null,
          url: "./lore-model.js", // "https://webaverse.github.io/lore/lore-model.js",
          type: "url",
          module: {},
        }
  );
  const [errorDialogData, setErrorDialogData] = useState({
    on: false,
    msg: "",
  });
  const [forceUpdate, setForceUpdate] = useState(false);
  const [oepnAIParams, setOpenAIPArams] = useState(defaultOpenAIParams);
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

    setOpenAIPArams(data);
    localStorage.setItem("openAIParams", JSON.stringify(data));
  };

  const updateDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode);
    globalThis.darkMode = darkMode;
  };

  useEffect(() => {
    const dm = localStorage.getItem("darkMode");
    if (dm && dm?.length > 0) {
      setDarkMode(dm.toLocaleLowerCase().trim() === "true");
      globalThis.darkMode = darkMode;
    }

    const oap = localStorage.getItem("openAIParams");
    if (oap && oap !== "[object Object]" && oap?.length > 0) {
      setOpenAIPArams(JSON.parse(oap));
    }

    localStorage.setItem("loreFiles", compressObject(loreFiles));
  }, [loreFiles]);

  useEffect(() => {
    loadBaseData(baseData, false, !baseData.base);
    console.log("baseData", baseData);
  }, []);

  // useEffect(() => {
  //   if(baseData) localStorage.setItem('baseData', JSON.stringify(baseData));
  // }, [baseData])

  useEffect(() => {
    localStorage.setItem("currentView", compressObject(currentView));
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
    } else {
      console.log("setLoreData:", data);
      setLoreData(data);
      console.log("lore Data:", loreData);
    }
  };

  const loadBaseData = async (data, callback, fromUrl = true) => {
    const loreHeader = await download_content("./lore_header.js");
    // convert to string
    const loreHeaderString = loreHeader.toString();
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
        console.log("content is", content);

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
          displayContent = content;
          content = loreHeaderString + content;
        }

        // convert content back to a blob with the x-javascript base64 type
        blob = new Blob([content], {
          type: "application/x-javascript;base64",
        });

        const fileUri = await fileToDataUri(blob);
        // fileUri is a base64 javascript document
        // we want to inject some code into the file before we
        const importedFile = await import(fileUri);
        setBaseData({
          base: fileUri,
          type: "file",
          module: importedFile,
          url: data.url,
        });
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
        content = loreHeader + "\n" + content;
      }
      // convert text to a blob with the x-javascript base64 type
      const blob = new Blob([content], {
        type: "application/x-javascript;base64",
      });
      const fileUri = await fileToDataUri(blob);
      const importedFile = await import(fileUri);
      setBaseData({
        base: fileUri,
        type: "file",
        module: importedFile,
        url: file.name,
      });
      end();
    }
  };

  const handleExport = (type) => {
    const json = JSON.stringify(
      type === "ingredients" ? ingredients : loreData
    );
    console.log(json);

    const element = document.createElement("a");
    const file = new Blob([json], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = type + "_" + new Date().getTime() + ".json";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const openErrorDialog = (msg) => {
    setErrorDialogData({ on: true, msg: msg });
  };
  const closeErrorDialog = () => {
    setErrorDialogData({ on: false, msg: "" });
  };

  const _forceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  return (
    <div className="App">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        _darkMode={darkMode}
        _setDarkMode={updateDarkMode}
      />
      {currentView === "setup" ? (
        <Setup
          _openAIParams={oepnAIParams}
          _setOpenAIParams={updateOpenAIParams}
        />
      ) : currentView === "map" ? (
        <MapView />
      ) : currentView === "base" ? (
        <LoreBase
          loreHeader={loreHeader}
          setLoreHeader={setLoreHeader}
          loadBaseData={loadBaseData}
          loreData={loreData}
          setLoreData={setLoreData}
          baseData={baseData}
          setBaseData={setBaseData}
          importHandler={(data) => handleImport("lore", data)}
          exportHandler={() => handleExport("lore")}
        />
      ) : currentView === "files" ? (
        <LoreFiles
          dataType={"lore"}
          importHandler={(data) => handleImport("output", data)}
          exportHandler={() => handleExport("output")}
          ingredients={ingredients}
          setIngredients={setIngredients}
          baseData={baseData}
          setBaseData={setBaseData}
          loreFiles={loreFiles}
          setLoreFiles={setLoreFiles}
          openErrorDialog={openErrorDialog}
        />
      ) : (
        <Ingredients
          dataType={"dialog"}
          importHandler={(data) => handleImport("ingredients", data)}
          exportHandler={() => handleExport("ingredients")}
          ingredients={ingredients}
          setIngredients={setIngredients}
          baseData={baseData}
          setBaseData={setBaseData}
          openErrorDialog={openErrorDialog}
          forceUpdate={_forceUpdate}
        />
      )}
      {errorDialogData &&
        errorDialogData.on &&
        errorDialogData.msg?.length > 0 && (
          <ErrorModal
            close={closeErrorDialog}
            info={"Error: " + errorDialogData.msg}
          ></ErrorModal>
        )}
    </div>
  );
}

export default App;
