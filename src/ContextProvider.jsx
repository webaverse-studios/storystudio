import React, { useEffect, useState, useRef } from "react";
import { getFile } from "./components/getFile";
import { ApplicationContext } from "./Context";
import "./styles/App.css";
import {
  defaultDialogue,
  defaultEntities,
  defaultOpenAIParams,
  dialogueTypes,
  exampleLoreFiles,
  lore,
} from "./utils/constants";
import murmurhash3String from "./utils/murmurhash3string";
import {
  makeId,
  compressObject,
  decompressObject,
  download_content,
  fileToDataUri,
} from "./utils/utils";
import { generate, makeEmpty, makeDialogue } from "./utils/generation";
import JSZip from "jszip";
import { Web3Storage } from "web3.storage";
import { downloadFile, uploadFile } from "./utils/storageUtils";

function setOpenAIKey(newKey) {
  localStorage.setItem("openai_key", newKey);
}

function getOpenAIKey() {
  return localStorage.getItem("openai_key");
}

if (!localStorage.getItem("entities")) {
  localStorage.setItem("entities", compressObject(defaultEntities));
}

if (!localStorage.getItem("dialogue")) {
  localStorage.setItem("dialogue", compressObject(defaultDialogue));
}

if (!localStorage.getItem("loreData")) {
  localStorage.setItem("loreData", compressObject(lore));
}
/******/

export function ApplicationContextProvider(props) {
  let openAiCommitTimer = null;
  let loreFilesCommitTimer = null;
  let entitiesCommitTimer = null;
  let dialogueCommitTimer = null;
  let loreDataCommitTimer = null;

  const [openaiapiKey, openaisetApiKey] = useState(getOpenAIKey());
  const [voiceApi, setVoiceApi] = useState(
    localStorage.getItem("voiceApi") ? localStorage.getItem("voiceApi") : ""
  );
  const [imgApi, setImgApi] = useState(
    localStorage.getItem("imgApi") ? localStorage.getItem("imgApi") : ""
  );
  const [generateImages, setGenerateImages] = useState(
    localStorage.getItem("generateImages") === "true"
  );
  const [web3SApiKey, setWeb3SApiKey] = useState(
    localStorage.getItem("web3SApiKey")
      ? localStorage.getItem("web3SApiKey")
      : ""
  );

  const [web3Storage, setWeb3Storage] = useState(
    web3SApiKey ? new Web3Storage({ token: web3SApiKey }) : null
  );

  const [entities, setEntities] = useState(
    localStorage.getItem("entities")
      ? decompressObject(localStorage.getItem("entities"))
      : defaultEntities
  );

  const [dialogue, setDialogue] = useState(
    localStorage.getItem("dialogue")
      ? decompressObject(localStorage.getItem("dialogue"))
      : defaultDialogue
  );

  const [currentDialogueType, setCurrentDialogueType] = useState(
    localStorage.getItem("dialogueType")
      ? decompressObject(localStorage.getItem("dialogueType"))
      : dialogueTypes[0]
  );

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
    url: "https://webaverse-studios.github.io/lore-engine/lore-model.js",
    type: "url",
    module: {},
  });

  const [errorDialogData, setErrorDialogData] = useState({
    on: false,
    msg: "",
  });

  const [openAIParams, setOpenAIParams] = useState(
    localStorage.getItem("openAIParams") || defaultOpenAIParams
  );

  useEffect(() => {
    const oap = localStorage.getItem("openAIParams");
    if (oap && oap !== "[object Object]" && oap?.length > 0) {
      setOpenAIParams(JSON.parse(oap));
    }

    const data = localStorage.getItem("baseData")
      ? JSON.parse(localStorage.getItem("baseData"))
      : baseData;

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

    if (openAiCommitTimer) {
      clearTimeout(openAiCommitTimer);
    }
    openAiCommitTimer = setTimeout(() => {
      localStorage.setItem("openAIParams", JSON.stringify(data));
    }, 500);
  };

  useEffect(() => {
    if (loreFilesCommitTimer) {
      clearTimeout(loreFilesCommitTimer);
    }
    loreFilesCommitTimer = setTimeout(() => {
      localStorage.setItem("loreFiles", compressObject(loreFiles));
    }, 500);
  }, [loreFiles]);

  const downloadEntities = async () => {
    const newEntities = { ...entities };
    const keys = Object.keys(newEntities);
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < newEntities[keys[i]].length; j++) {
        console.log(newEntities[keys[i]][j].imageCid?.length)
        if (newEntities[keys[i]][j].imageCid?.length === 59) {
          newEntities[keys[i]][j].image = await downloadFile(
            web3Storage,
            newEntities[keys[i]][j].imageCid
          );
        }
      }
    }
    setEntities(newEntities);
  };

  useEffect(() => {
    onbeforeunload = (event) => {
      const newEntities = { ...entities };
      const keys = Object.keys(newEntities);
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < newEntities[keys[i]].length; j++) {
          if (newEntities[keys[i]][j].image?.length > 0) {
            newEntities[keys[i]][j].image = "";
          }
        }
      }
      localStorage.setItem("entities", compressObject(newEntities));
    };
    downloadEntities();
  }, []);

  useEffect(() => {
    if (dialogueCommitTimer) {
      clearTimeout(dialogueCommitTimer);
    }
    entitiesCommitTimer = setTimeout(() => {
      localStorage.setItem("dialogue", compressObject(dialogue));
    }, 500);
  }, [dialogue]);

  useEffect(() => {
    if (loreDataCommitTimer) {
      clearTimeout(loreDataCommitTimer);
    }
    loreDataCommitTimer = setTimeout(() => {
      localStorage.setItem("loreData", compressObject(loreData));
    }, 500);
  }, [loreData]);

  const handleImport = (type, data) => {
    const newData = { ...entities };

    newData[type].unshift(data);

    setEntities(newData);
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
      type === "entities" ? entities : type === "lore" ? loreData : loreFiles
    );

    const element = document.createElement("a");
    const file = new Blob([json], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = type + "_" + new Date().getTime() + ".json";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const addEntityCallback = async (entityType) => {
    if (entityType === "loreFiles") {
      const entity = await makeEmpty(entityType, openErrorModal);
      const newLoreFiles = [...loreFiles];
      newLoreFiles.unshift(entity);
      setLoreFiles(newLoreFiles);
    } else {
      const entity = await makeEmpty(entityType, openErrorModal);

      entity.id = makeId(5);

      const newEntityData = { ...entities };
      if (!newEntityData[entityType]) {
        newEntityData[entityType] = [];
      }

      newEntityData[entityType].unshift(entity);

      setEntities(newEntityData);
    }
  };

  const generateEntityCallback = async (
    entityType,
    data,
    setGenerating,
    second = false
  ) => {
    setGenerating(true);
    if (entityType === "loreFiles") {
      const entity = await generate(
        entityType,
        data,
        baseData,
        openErrorModal,
        lore
      );

      if (!entity) {
        setGenerating(false);
        return;
      }

      const newLoreFiles = [...loreFiles];
      newLoreFiles.unshift(entity);
      setLoreFiles(newLoreFiles);
    } else {
      let entity = null;
      try {
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
      if (!entity.id && typeof entity === "object") {
        entity.id = makeId(5);
      }
      const newEntityData = { ...entities };
      if (!newEntityData[entityType]) {
        newEntityData[entityType] = [];
      }

      newEntityData[entityType].unshift(entity);

      setEntities(newEntityData);
    }
    setGenerating(false);
  };

  const deleteEntityCallback = (entity, index, type) => {
    if (type === "loreFiles") {
      const newLoreFiles = [...loreFiles];
      newLoreFiles.splice(index, 1);
      setLoreFiles(newLoreFiles);
    } else {
      const newData = { ...entities };
      newData[type].splice(index, 1);

      setEntities(newData);
    }
  };

  const editEntityCallback = (entity, index) => {
    if (typeof entity === "string") {
      const newLoreFiles = [...loreFiles];
      newLoreFiles[index] = entity;
      setLoreFiles(newLoreFiles);
    } else {
      let newData = { ...entities };

      const entityIndex = !Object.keys(entity).includes("type")
        ? index
        : newData[entity.type].findIndex((e) => e.id === entity.id);

      newData[entity.type][entityIndex] = entity;

      setEntities(newData);
    }
  };

  const addDialogueCallback = async (type) => {
    const d = await makeDialogue(type, openErrorModal);

    const newDialogueData = { ...dialogue };
    if (!newDialogueData[type]) {
      newDialogueData[type] = [];
    }

    newDialogueData[type].unshift(d);

    setDialogue(newDialogueData);
  };

  const exportLoreMD = async () => {
    const data = [...loreFiles];
    const zip = new JSZip();
    for (let i = 0; i < data.length; i++) {
      zip.file(
        `lore_${i}.md`,
        typeof data[i] === "string" ? data[i] : data[i][0]
      );
    }
    const element = document.createElement("a");
    const file = await zip.generateAsync({ type: "blob" });
    element.href = URL.createObjectURL(file);
    element.download = "lores_" + Date.now() + ".zip";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const importProject = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);

    const { entities, dialogue, loreFiles, settings } = json;
    setEntities(entities);
    downloadEntities();
    setDialogue(dialogue);
    setLoreFiles(loreFiles);

    const {
      voiceApi,
      imgApi,
      generateImages,
      openAIParams,
      openAIKey,
      web3SApiKey,
    } = settings;
    updateVoiceApi(voiceApi);
    updateImgApi(imgApi);
    updateGenerateImages(generateImages);
    updateOpenAIParams(openAIParams);
    updateOpenAIAPiKey(openAIKey);
    updateWeb3SApiKey(web3SApiKey);
  };
  const exportProject = () => {
    const newEntities = { ...entities };
    const keys = Object.keys(newEntities);
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < newEntities[keys[i]].length; j++) {
        if (newEntities[keys[i]][j].image?.length > 0) {
          newEntities[keys[i]][j].image = "";
        }
      }
    }

    const json = JSON.stringify({
      entities: newEntities,
      dialogue,
      loreFiles,
      settings: {
        voiceApi,
        imgApi,
        generateImages,
        openAIParams,
        openAIKey: getOpenAIKey(),
        web3SApiKey,
      },
    });

    const element = document.createElement("a");
    const file = new Blob([json], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "project_" + new Date().getTime() + ".json";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const generateDialogueCallback = async (
    type,
    data,
    setGenerating,
    second = false
  ) => {
    setGenerating(true);
    let d = null;
    try {
      d = await generate(type, entities, baseData, openErrorModal);
    } catch (e) {
      // openErrorModal("Error generating entity", e);
      console.log("error", e);
      setGenerating(false);
      if (!second) {
        generateDialogueCallback(type, data, setGenerating, true);
      }
      return;
    }
    return;
    if (!d) {
      // openErrorModal("could not generate entity");
      setGenerating(false);
      return;
    }

    const newData = { ...dialogue };
    if (!newData[type]) {
      newData[type] = [];
    }

    newData[type].unshift(d);

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

  const editDialogueCallback = (d, selector, key, index) => {
    // selector is a '.' separated string of the path to the value inside dialogue
    // e.g. 'input.text' would be the text of the input of the dialogue
    let newData = { ...dialogue };
    // split the selector into an array
    const selectorArray = selector.split(".");

    // drill down into the dialogue object using the selector array
    let current = newData[currentDialogueType][index];

    for (let i = 0; i < selectorArray.length - 1; i++) {
      current = current[selectorArray[i]];
    }

    current[selectorArray[selectorArray.length - 1]] = d;
    setDialogue(newData);
  };
  const removeEntryFromDialogue = (selector, index) => {
    const newData = { ...dialogue };
    const selectorArray = selector.split(".");
    const _index = parseInt(selectorArray[selectorArray.length - 2]);
    newData[currentDialogueType][index]["output"]["transcript"].splice(
      _index,
      1
    );
    setDialogue(newData);
  };
  const addDialogueEntry = (_key) => {
    const newData = { ...dialogue };
    newData[currentDialogueType][_key].output.transcript.unshift({
      speaker: "",
      message: "",
    });
    setDialogue(newData);
  };
  const cleanDialogueMessages = (_key) => {
    const newData = { ...dialogue };
    newData[currentDialogueType][_key].output.transcript = [];
    setDialogue(newData);
  };
  const addDialogueEntryWithData = (_key, speaker, message) => {
    const newData = { ...dialogue };
    newData[currentDialogueType][_key].output.transcript.unshift({
      speaker: speaker,
      message,
    });
    setDialogue(newData);
  };
  const setDialogEntries = (_key, transcript) => {
    const newData = { ...dialogue };
    newData[currentDialogueType][_key].output.transcript = transcript;
    setDialogue(newData);
  };

  const editDialogueJson = (d, index) => {
    let newData = { ...dialogue };
    newData[currentDialogueType][index] = d;
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

    if (typeof entity === "string") {
      const index = loreFiles.findIndex((e) => e === entity);
      if (index === -1) {
        return;
      }

      const newLoreFiles = [...loreFiles];
      if (index === 0 && up) {
        newLoreFiles.push(newLoreFiles.shift());
      } else if (index === loreFiles.length - 1 && !up) {
        newLoreFiles.unshift(newLoreFiles.pop());
      } else {
        const newIndex = up ? index - 1 : index + 1;
        if (newIndex > newLoreFiles.length - 1 || newIndex < 0) {
          return;
        }
        const temp = newLoreFiles[newIndex];
        newLoreFiles[newIndex] = newLoreFiles[index];
        newLoreFiles[index] = temp;
      }
      setLoreFiles(newLoreFiles);
    } else {
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
      setEntities(newData);
    }
  };

  const importEntityList = async () => {
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
    setEntities(newData);
  };

  const addLore = async (type, setGenerating) => {
    setGenerating(true);
    const newLore = { ...lore };
    const newLoreData = { ...newLore[type] };
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

  const getInventoryItems = () => {
    return (entities["object"] ?? []).map((e) => e.name);
  };

  const getObject = (name) => {
    return entities["object"]?.find((e) => e.name === name);
  };
  const getCharacter = (name) => {
    return entities["character"]?.find((e) => e.name.includes(name));
  };
  const getNPC = (name) => {
    return entities["npc"]?.find((e) => e.name === name);
  };
  const getSetting = (name) => {
    return entities["setting"]?.find((e) => e.name === name);
  };
  const getMob = (name) => {
    return entities["mob"]?.find((e) => e.name === name);
  };

  const getTypeOfObject = (name) => {
    if (getObject(name)) {
      return "object";
    } else if (getCharacter(name)) {
      return "character";
    } else if (getNPC(name)) {
      return "npc";
    } else if (getSetting(name)) {
      return "setting";
    } else if (getMob(name)) {
      return "mob";
    }

    return "character";
  };

  const updateVoiceApi = (value) => {
    setVoiceApi(value);
    localStorage.setItem("voiceApi", value);
  };
  const updateImgApi = (value) => {
    setImgApi(value);
    localStorage.setItem("imgApi", value);
  };
  const updateGenerateImages = (value) => {
    setGenerateImages(value);
    localStorage.setItem("generateImage", value);
  };

  const updateOpenAIAPiKey = (value) => {
    setOpenAIKey(value);
    openaisetApiKey(value);
  };

  const updateWeb3SApiKey = (value) => {
    setWeb3SApiKey(value);
    localStorage.setItem("web3SApiKey", value);
    if (value) {
      setWeb3Storage(new Web3Storage({ token: value }));
    }
  };

  const provider = {
    getOpenAIKey: () => getOpenAIKey(),
    setOpenAIKey: (key) => setOpenAIKey(key),
    errorDialogData,
    openAIParams,
    setOpenAIParams,
    updateOpenAIParams,
    dialogue,
    setDialogue,
    currentDialogueType,
    setCurrentDialogueType,
    entities: entities,
    setEntities,
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
    editDialogueCallback,
    exportLoreMD,
    exportProject,
    importProject,
    handleImport,
    editDialogueJson,
    getInventoryItems,
    removeEntryFromDialogue,
    addDialogueEntry,
    addDialogueEntryWithData,
    getObject,
    getCharacter,
    getNPC,
    getSetting,
    getMob,
    getTypeOfObject,
    setDialogEntries,
    cleanDialogueMessages,
    voiceApi,
    imgApi,
    updateVoiceApi,
    updateImgApi,
    generateImages,
    updateGenerateImages,
    updateOpenAIAPiKey,
    openaiapiKey,
    web3Storage,
    web3SApiKey,
    updateWeb3SApiKey,
  };

  return (
    <ApplicationContext.Provider value={provider}>
      {props.children}
    </ApplicationContext.Provider>
  );
}
