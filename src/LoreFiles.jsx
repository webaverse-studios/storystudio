import { useEffect, useState } from "react";
import "./App.css";
import { entityPrototypes, contextTypes } from "./constants";
import { generate } from "./utils/openai_utils";
import ListBox from "./ListBox";
import Context from "./ContextSelector";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";
import { getFile } from "./getFile";

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function LoreFiles({dataType, baseData, ingredients, setIngredients, loreFiles, setLoreFiles, exportHandler, importHandler}) {
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);

  const addEntityCallback = async (
    setGenerating
  ) => {
    setGenerating(true);
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = await generate('lore', ingredients, baseData);
    if(!entity){
      console.error('could not generate entity');
      setGenerating(false);
      return;
    }
    console.log("generate entity", entity);
    if(entity[0]) entity = entity[0];
    if (!entity.id) {
      entity.id = makeId(5);
    }
    const newEntityData = [ ...loreFiles ];
    newEntityData.push(entity);

    setLoreFiles(newEntityData);
    setGenerating(false);
  };
  const deleteEntityCallback = (entity, fromCurrentContentType) => {
    const newData = { ...loreFiles };
    if (fromCurrentContentType) {
      newData = loreFiles.filter((e) => e.id && e.id !== entity.id);
    } else {
      newData = loreFilesfilter(
        (e) => e.id !== entity.id
      );
    }

    setLoreFiles(newData);
  };

  const editEntityCallback = (entity, index) => {
    console.log('editing entity', entity, index)
    let newData = [ ...loreFiles ];
    console.log('loreFiles is', loreFiles)
    if(index !== undefined){
      newData[index] = entity;
      console.log('setting loreFiles to', newData)
    } else {

      const entityIndex = newData.findIndex(
        (e) => e.id === entity.id
        );
        newData[entityIndex] = entity;
      }
        
      setLoreFiles(newData);
  };

  const handleImport = (data) => {
    setIngredients(data);
  };

  const handleExport = () => {
    const json = JSON.stringify(loreFiles);
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
      <div className={"importExportButtons"}>
        <button className={"importButton"} onClick={() => importJson()}>
          Import
        </button>
        <button className={"exportButton"} onClick={() => exportHandler()}>
          Export
        </button>
      </div>
      <div className="sections">
        <ListBox
          type={dataType}
          data={loreFiles}
          header={dataType}
          addEntityCallback={(data, setGenerating) => {
            addEntityCallback(setGenerating);
          }}
          editEntityCallback={editEntityCallback}
          deleteEntityCallback={(data) => deleteEntityCallback(data, true)}
          showLabels={true}
        /> 
      </div>
    </div>
  );
}

export default LoreFiles;
