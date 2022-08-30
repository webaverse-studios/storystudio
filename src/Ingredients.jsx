import { useState } from "react";
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

function Ingredients({
  dataType,
  baseData,
  ingredients,
  setIngredients,
  exportHandler,
  importHandler,
  openErrorModal,
}) {
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);

  const addEntityCallback = async (entityType, data, setGenerating) => {
    setGenerating(true);
    console.log("entityType, data, baseData", entityType, data, baseData);
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = null;
    try {
      entity = await generate(entityType, data, baseData, openErrorModal);
    } catch (e) {
      console.log("error", e);
      openErrorModal("Error generating entity", e);
      setGenerating(false);
      return;
    }
    if (!entity) {
      openErrorModal("could not generate entity");
      setGenerating(false);
      return;
    }
    console.log("generate entity", entity);
    if (!entity.id) {
      entity.id = makeId(5);
    }
    console.log("ingredients", ingredients);

    const newEntityData = { ...ingredients };

    console.log(
      "entityType",
      entityType,
      "dataType:",
      dataType,
      newEntityData[entityType][currentContentType],
      newEntityData[entityType]
    );
    const array =
      entityType === dataType
        ? newEntityData[entityType][currentContentType]
        : newEntityData[entityType];

    console.log("array", array);
    array.push(entity);
    newEntityData[entityType] = array;
    console.log(
      "newEntityData[entityType][currentContentType]",
      newEntityData[entityType][currentContentType]
    );
    setIngredients(newEntityData);
    setGenerating(false);
  };
  const deleteEntityCallback = (entity, fromCurrentContentType) => {
    const newData = { ...ingredients };
    if (fromCurrentContentType) {
      newData[dataType][currentContentType] = ingredients[dataType][
        currentContentType
      ].filter((e) => e.id && e.id !== entity.id);
    } else {
      newData[entity.type] = ingredients[entity.type].filter(
        (e) => e.id !== entity.id
      );
    }

    setIngredients(newData);
  };

  const editEntityCallback = (entity) => {
    let newData = { ...ingredients };

    if (entity.message !== undefined) {
      newData[dataType][currentContentType];

      const entityIndex = newData[dataType][currentContentType].findIndex(
        (e) => e.id === entity.id
      );
      newData[dataType][currentContentType][entityIndex] = entity;
    } else {
      const entityIndex = newData[entity.type].findIndex(
        (e) => e.id === entity.id
      );
      newData[entity.type][entityIndex] = entity;
    }

    setIngredients(newData);
  };

  const handleImport = (data) => {
    setIngredients(data);
  };

  const handleExport = () => {
    const json = JSON.stringify(ingredients);
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

  const moveEntity = (entity, up) => {
    if (!entity || entity === undefined) {
      return;
    }

    const index = ingredients[entity.type].findIndex(
      (e) => e.name === entity.name
    );
    if (index === null || index === undefined || index <= -1) {
      return;
    }

    const newData = { ...ingredients };
    const newArray = [...newData[entity.type]];
    if (newArray?.length <= 1) {
      return;
    }

    if (index === 0 && up) {
      newArray.push(newArray.shift());
    } else if (index === ingredients[entity.type].length - 1 && !up) {
      newArray.unshift(newArray.pop());
    } else {
      const newIndex = up ? index - 1 : index + 1;
      const temp = newArray[index];
      newArray[index] = newArray[newIndex];
      newArray[newIndex] = temp;
    }

    newData[entity.type] = newArray;
    setIngredients(newData);
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
        {entityPrototypes.map((entity, index) => {
          return (
            <ListBox
              testValue={"test value"}
              key={index}
              type={entity.type}
              data={ingredients[entity.type]}
              header={entity.type + "s"}
              addEntityCallback={(data, setGenerating) =>
                addEntityCallback(entity.type, data, setGenerating)
              }
              editEntityCallback={(data) => editEntityCallback(data)}
              deleteEntityCallback={(data) => deleteEntityCallback(data)}
              moveEntityCallback={(entity, up) => moveEntity(entity, up)}
            />
          );
        })}
        <Context
          data={ingredients[dataType]}
          contextTypes={contextTypes}
          currentContentType={currentContentType}
          setCurrentContentType={setCurrentContentType}
        />
        <ListBox
          type={dataType}
          data={ingredients[dataType][currentContentType]}
          header={dataType}
          updateLocation={(up) => moveEntity(up)}
          addEntityCallback={(data, setGenerating) => {
            addEntityCallback(dataType, ingredients, setGenerating);
          }}
          editEntityCallback={(data) => editEntityCallback(data)}
          deleteEntityCallback={(data) => deleteEntityCallback(data, true)}
          moveEntityCallback={(entity, up) => moveEntity(entity, up)}
          showLabels={true}
        />
      </div>
    </div>
  );
}

export default Ingredients;
