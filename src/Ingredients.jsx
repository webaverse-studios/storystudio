import { useState } from "react";
import "./App.css";
import { entityPrototypes, contextTypes } from "./constants";
import { generate } from "./utils/openai_utils";
import ListBox from "./ListBox";
import Context from "./ContextSelector";
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
  forceUpdate,
  lore,
  setLore,
}) {
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);

  const addEntityCallback = async (
    entityType,
    data,
    setGenerating,
    second = false
  ) => {
    setGenerating(true);
    console.log("entityType, data, baseData", entityType, data, baseData);
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = null;
    try {
      entity = await generate(entityType, data, baseData, openErrorModal);
    } catch (e) {
      console.log("error", e);
      setGenerating(false);
      if (!second) {
        addEntityCallback(entityType, data, setGenerating, true);
      }
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
    if (!newEntityData[entityType]) {
      newEntityData[entityType] = [];
    }

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

  const updateEditMode = () => {
    const editMode =
      new URLSearchParams(window.location.search).get("edit") === "true"
        ? true
        : false;
    const params = new URLSearchParams(window.location.search);
    params.set("edit", !editMode);
    window.history.pushState({}, "", `?${params.toString()}`);
    forceUpdate();
  };

  const renderEditModeButton = () => {
    const editMode =
      new URLSearchParams(window.location.search).get("edit") === "true"
        ? true
        : false;

    if (editMode) {
      return "Exit edit mode";
    } else {
      return "Enter edit mode";
    }
  };

  const importEntityList = async () => {
    console.log("import");
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    const index = ingredients[json.type].findIndex((e) => e.id === json.id);
    if (index !== -1) {
      return;
    }

    const newData = { ...ingredients };
    if (!newData[json.type]) {
      newData[json.type] = [];
    }
    newData[json.type].unshift(json);
    setIngredients(newData);
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
  const editLore = (entity, index) => {
    const newLore = { ...lore };
    const newLoreData = { ...newLore[currentContentType] };
    const newLoreExamples = [...newLoreData.examples];

    newLoreExamples[index] = entity;

    newLoreData.examples = newLoreExamples;
    newLore[currentContentType] = newLoreData;
    setLore(newLore);
  };
  const deleteLore = (data, index) => {
    const newLore = { ...lore };
    const newLoreData = { ...newLore[currentContentType] };
    const newLoreExamples = [...newLoreData.examples];

    newLoreExamples.splice(index, 1);

    newLoreData.examples = newLoreExamples;
    newLore[currentContentType] = newLoreData;
    setLore(newLore);
  };
  const moveLore = (data, up) => {
    const newLore = { ...lore };
    const newLoreData = { ...newLore[currentContentType] };
    const newLoreExamples = [...newLoreData.examples];

    const index = newLoreExamples.findIndex((e) => e === data);
    if (index === null || index === undefined || index <= -1) {
      return;
    }

    if (newLoreExamples?.length <= 1) {
      return;
    }

    if (index === 0 && up) {
      newLoreExamples.push(newLoreExamples.shift());
    } else if (index === newLoreExamples.length - 1 && !up) {
      newLoreExamples.unshift(newLoreExamples.pop());
    } else {
      const newIndex = up ? index - 1 : index + 1;
      if (newIndex > newLoreExamples.length - 1 || newIndex < 0) {
        return;
      }
      const temp = newLoreExamples[index];
      newLoreExamples[index] = newLoreExamples[newIndex];
      newLoreExamples[newIndex] = temp;
    }

    newLoreData.examples = newLoreExamples;
    newLore[currentContentType] = newLoreData;
    setLore(newLore);
  };

  return (
    <div className="view">
      <div className={"importExportButtons"}>
        <button onClick={updateEditMode}>{renderEditModeButton()}</button>
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
              data={ingredients ? ingredients[entity.type] : []}
              header={entity.type + "s"}
              addEntityCallback={(data, setGenerating) =>
                addEntityCallback(entity.type, data, setGenerating)
              }
              editEntityCallback={(data) => editEntityCallback(data)}
              deleteEntityCallback={(data) => deleteEntityCallback(data)}
              moveEntityCallback={(entity, up) => moveEntity(entity, up)}
              handleImport={importEntityList}
            />
          );
        })}
        <Context
          data={lore ? lore : []}
          contextTypes={contextTypes}
          currentContentType={currentContentType}
          setCurrentContentType={setCurrentContentType}
        />
        <ListBox
          type={currentContentType}
          data={
            lore && lore[currentContentType]
              ? lore[currentContentType].examples
              : []
          }
          header={dataType}
          addEntityCallback={(data, setGenerating) => {
            addLore(currentContentType, setGenerating);
          }}
          editEntityCallback={(lore, index) => editLore(lore, index)}
          deleteEntityCallback={(lore, index) => deleteLore(lore, index)}
          moveEntityCallback={(entity, up) => moveLore(entity, up)}
          showLabels={true}
          handleImport={importEntityList}
        />
      </div>
    </div>
  );
}

export default Ingredients;
