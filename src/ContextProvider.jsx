import React, { useEffect, useState } from "react";
import { getFile } from "./components/getFile";
import { ApplicationContext } from './Context';
import "./styles/App.css";
import { defaultDialogue, defaultEntities, defaultOpenAIParams, dialogueTypes, exampleLoreFiles, lore } from "./utils/constants";
import murmurhash3String from "./utils/murmurhash3string";
import {
  makeId,
  compressObject,
  decompressObject,
  download_content,
  fileToDataUri
} from "./utils/utils";
import { generate, makeEmpty, makeDialogue } from "./utils/generation";


function setOpenAIKey(newKey) {
  localStorage.setItem("openai_key", newKey);
}

function getOpenAIKey() {
  return localStorage.getItem("openai_key");
}

function initializeState() {
  if (!localStorage.getItem("entities")) {
    localStorage.setItem("entities", compressObject(defaultEntities));
  }

  if (!localStorage.getItem("dialogue")) {
    localStorage.setItem("dialogue", compressObject(defaultDialogue));
  }

  if (
    !localStorage.getItem("loreData")
  ) {
    localStorage.setItem("loreData", compressObject(lore));
  }
}

export function ApplicationContextProvider(props) {
  initializeState();
  const [entities, setIngredients] = useState(
    decompressObject(localStorage.getItem("entities")) || defaultEntities
  );

  const [dialogue, setDialogue] = useState(
    localStorage.getItem("dialogue") ? decompressObject(localStorage.getItem("dialogue")) : defaultDialogue
  );

  console.log('dialogue is', dialogue)

  const [currentDialogueType, setCurrentDialogueType] = useState(
    localStorage.getItem("dialogueType") ? decompressObject(localStorage.getItem("dialogueType")) : dialogueTypes[0]
  );

  const [loreFiles, setLoreFiles] = useState(
    localStorage.getItem("loreFiles") ? decompressObject(localStorage.getItem("loreFiles")) : exampleLoreFiles
  );

  const [loreData, setLoreData] = useState(
    localStorage.getItem("loreData") ? decompressObject(localStorage.getItem("loreData")) : lore
  );

  const [loreHeader, setLoreHeader] = useState("");

  const [baseData, setBaseData] = useState(localStorage.getItem("baseData")
    ? JSON.parse(localStorage.getItem("baseData"))
    : {
      base: null,
      url: "./lore-model.js", // "https://webaverse.github.io/lore/lore-model.js",
      type: "url",
      module: {},
    });

  const [errorDialogData, setErrorDialogData] = useState({
    on: false,
    msg: "",
  });

  const [openAIParams, setOpenAIParams] = useState(localStorage.getItem("openAIParams") || defaultOpenAIParams);

  useEffect(() => {
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

  useEffect(() => {
    localStorage.setItem("loreFiles", compressObject(loreFiles));
  }, [loreFiles]);


  useEffect(() => {
    localStorage.setItem("entities", compressObject(entities));
  }, [entities]);

  useEffect(() => {
    localStorage.setItem("dialogue", compressObject(dialogue));
  }, [dialogue]);

  useEffect(() => {
    localStorage.setItem("loreData", compressObject(loreData));
  }, [loreData]);

  const handleImport = (type, data) => {
    if (type === "entities") {
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
      type === "entities"
        ? entities
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

  const addEntityCallback = async (
    entityType
  ) => {
    const entity = await makeEmpty(
      entityType,
      openErrorModal
    );

    entity.id = makeId(5);

    const newEntityData = { ...entities };
    if (!newEntityData[entityType]) {
      newEntityData[entityType] = [];
    }

    newEntityData[entityType].unshift(entity);

    setIngredients(newEntityData);
  };

  const generateEntityCallback = async (
    entityType,
    data,
    setGenerating,
    second = false
  ) => {
    setGenerating(true);
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = null;
    try {
      console.log(baseData);
      entity = await generate(
        entityType,
        data,
        baseData,
        openErrorModal,
        lore
      );
    } catch (e) {
      // openErrorModal("Error generating entity", e);
      console.log("error", e);
      setGenerating(false);
      if (!second) {
        generateEntityCallback(entityType, data, setGenerating, true);
      }
      return;
    }
    if (!entity) {
      // openErrorModal("could not generate entity");
      setGenerating(false);
      return;
    }
    if (!entity.id) {
      entity.id = makeId(5);
    }

    const newEntityData = { ...entities };
    if (!newEntityData[entityType]) {
      newEntityData[entityType] = [];
    }

    newEntityData[entityType].unshift(entity);

    setIngredients(newEntityData);
    setGenerating(false);
  };

  const deleteEntityCallback = (entity) => {
    const newData = { ...entities };
    newData[entity.type] = entities[entity.type].filter(
      (e) => e.id !== entity.id
    );

    setIngredients(newData);
  };

  const editEntityCallback = (entity) => {
    let newData = { ...entities };

    const entityIndex = newData[entity.type].findIndex(
      (e) => e.id === entity.id
    );

    newData[entity.type][entityIndex] = entity;

    setIngredients(newData);
  };

  const addDialogueCallback = async (
    type
  ) => {
    const d = await makeDialogue(
      type,
      openErrorModal
    );

    const newDialogueData = { ...dialogue };
    if (!newDialogueData[type]) {
      newDialogueData[type] = [];
    }

    newDialogueData[type].unshift(d);

    setDialogue(newDialogueData);
  };

  const generateDialogueCallback = async (
    type,
    data,
    setGenerating,
    second = false
  ) => {
    setGenerating(true);
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = null;
    try {
      console.log(baseData);
      entity = await generate(
        type,
        data,
        baseData,
        openErrorModal,
        lore
      );
    } catch (e) {
      // openErrorModal("Error generating entity", e);
      console.log("error", e);
      setGenerating(false);
      if (!second) {
        generateDialogueCallback(type, data, setGenerating, true);
      }
      return;
    }
    if (!entity) {
      // openErrorModal("could not generate entity");
      setGenerating(false);
      return;
    }

    const newData = { ...dialogue };
    if (!newData[type]) {
      newData[type] = [];
    }

    newData[type].unshift(entity);

    setDialogue(newData);
    setGenerating(false);
  };

  const deleteDialogueCallback = (d, index) => {
    const newDialogueData = { ...dialogue };
    newDialogueData[currentDialogueType] = dialogue[currentDialogueType].filter(
      (e, i) => i !== index
    );

    setDialogue(newDialogueData);
  };

  const editDialogueCallback = (d) => {
    let newData = { ...dialogue };

    const index = newData[d.type].findIndex(
      (e) => e.id === d.id
    );

    newData[d.type][index] = d;

    setDialogue(newData);
  };

  const importJson = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    importHandler(json);
  };

  const moveEntity = (entity, up) => {
    if (!entity || entity === undefined) {
      return;
    }

    const index = entities[entity.type].findIndex(
      (e) => e.name === entity.name
    );
    if (index === null || index === undefined || index <= -1) {
      return;
    }

    const newData = { ...entities };
    const newArray = [...newData[entity.type]];
    if (newArray?.length <= 1) {
      return;
    }

    if (index === 0 && up) {
      newArray.push(newArray.shift());
    } else if (index === entities[entity.type].length - 1 && !up) {
      newArray.unshift(newArray.pop());
    } else {
      const newIndex = up ? index - 1 : index + 1;
      if (newIndex > newArray.length - 1 || newIndex < 0) {
        return;
      }
      const temp = newArray[index];
      newArray[index] = newArray[newIndex];
      newArray[newIndex] = temp;
    }

    newData[entity.type] = newArray;
    setIngredients(newData);
  };

  const importEntityList = async () => {
    console.log("import");
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    const index = entities[json.type].findIndex((e) => e.id === json.id);
    if (index !== -1) {
      return;
    }

    const newData = { ...entities };
    if (!newData[json.type]) {
      newData[json.type] = [];
    }
    newData[json.type].unshift(json);
    setIngredients(newData);
  };

  const addLore = async (type, setGenerating) => {
    setGenerating(true);
    console.log("lore is", lore);
    const newLore = { ...lore };
    const newLoreData = { ...newLore[type] };
    console.log("newLoreData are", newLoreData);
    const newLoreExamples = [...newLoreData.examples];
    newLoreExamples.unshift("new " + type);
    newLoreData.examples = newLoreExamples;
    newLore[type] = newLoreData;
    setLore(newLore);

    setGenerating(false);
  };

  const openErrorModal = (msg) => {
    setErrorDialogData({ on: true, msg: msg });
  };
  const closeErrorDialog = () => {
    setErrorDialogData({ on: false, msg: "" });
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
    entities,
    setIngredients,
    openErrorModal,
    closeErrorDialog,
    loreHeader,
    setLoreHeader,
    loreFiles,
    setLoreFiles,
    loreData,
    setLoreData,
    baseData,
    loadBaseData,
    addEntityCallback,
    generateEntityCallback,
    deleteEntityCallback,
    editEntityCallback,
    importJson,
    moveEntity,
    importEntityList,
    addLore,
    addDialogueCallback,
    generateDialogueCallback,
    deleteDialogueCallback,
    editDialogueCallback
  }

  return (
    <ApplicationContext.Provider
      value={provider}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
}