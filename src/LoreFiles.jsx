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
import { makeId } from "./utils/utils";

function LoreFiles({
  dataType,
  baseData,
  ingredients,
  setIngredients,
  loreFiles,
  setLoreFiles,
  exportHandler,
  importHandler,
}) {
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);

  const addEntityCallback = async (setGenerating) => {
    setGenerating(true);
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = await generate("lore", ingredients, baseData);
    if (!entity) {
      console.error("could not generate entity");
      setGenerating(false);
      return;
    }
    console.log("generate entity", entity);
    if (typeof entity === "array") {
      if (entity[0]) entity = entity[0];
    }
    // if entity is an object, check if it has an id, if not, make one
    if (typeof entity === "object" && !entity.id) {
      entity.id = makeId(5);
    }
    const newEntityData = [...loreFiles];
    console.log("newEntityData is", newEntityData);
    newEntityData.push(entity);

    setLoreFiles(newEntityData);
    setGenerating(false);
  };
  const deleteEntityCallback = (entity, fromCurrentContentType, index) => {
    console.log("index is", index);
    let newData = [...loreFiles];
    if (index) {
      // remove newData[index]
      newData.splice(index, 1);
    } else {
      if (fromCurrentContentType) {
        newData = loreFiles.filter((e) => e.id && e.id !== entity.id);
      } else {
        newData = loreFilesfilter((e) => e.id !== entity.id);
      }
    }

    setLoreFiles(newData);
  };

  const editEntityCallback = (entity, index) => {
    console.log("editing entity", entity, index);
    let newData = [...loreFiles];
    console.log("loreFiles is", loreFiles);
    if (index !== undefined) {
      newData[index] = entity;
      console.log("setting loreFiles to", newData);
    } else {
      const entityIndex = newData.findIndex((e) => e.id === entity.id);
      newData[entityIndex] = entity;
    }

    setLoreFiles(newData);
  };

  const moveEntity = (entity, up) => {
    if (!entity || entity === undefined) {
      return;
    }

    let index = -1;
    for (let obj in loreFiles) {
      if (entity === loreFiles[obj]) {
        index = obj;
        break;
      }
    }
    index = parseInt(index);

    if (index === null || index === undefined || index <= -1) {
      return;
    }

    const newData = [...loreFiles];
    if (newData.length <= 1) {
      return;
    }

    if (index === 0 && up) {
      newData.push(newData.shift());
    } else if (index === loreFiles.length - 1 && !up) {
      newData.unshift(newData.pop());
    } else {
      const newIndex = up ? index - 1 : index + 1;
      if (newIndex > loreFiles.length - 1 || newIndex < 0) {
        return;
      }
      const temp = newData[index];
      newData[index] = newData[newIndex];
      newData[newIndex] = temp;
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
          deleteEntityCallback={(data, index) =>
            deleteEntityCallback(data, true, index)
          }
          moveEntityCallback={(entity, up) => moveEntity(entity, up)}
          showLabels={true}
        />
      </div>
    </div>
  );
}

export default LoreFiles;
