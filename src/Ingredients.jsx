import { useContext } from "react";
import EntityListBox from "./components/EntityListBox";
import { getFile } from "./components/getFile";
import { ApplicationContext } from "./Context";
import "./styles/App.css";
import { entityTypes } from "./utils/constants";
import { generate, makeEmpty } from "./utils/generation";
import { makeId } from "./utils/utils";

function Ingredients() {
  const {
    baseData,
    exportHandler,
    importHandler,
    openErrorModal,
    lore,
    setLore,
    ingredients
  } = useContext(ApplicationContext);

  const addEntityCallback = async (
    entityType
  ) => {
    const entity = await makeEmpty(
      entityType,
      openErrorModal
    );

    entity.id = makeId(5);

    const newEntityData = { ...ingredients };
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

    const newEntityData = { ...ingredients };
    if (!newEntityData[entityType]) {
      newEntityData[entityType] = [];
    }

    newEntityData[entityType].unshift(entity);

    setIngredients(newEntityData);
    setGenerating(false);
  };
  const deleteEntityCallback = (entity) => {
    const newData = { ...ingredients };
    newData[entity.type] = ingredients[entity.type].filter(
      (e) => e.id !== entity.id
    );

    setIngredients(newData);
  };

  const editEntityCallback = (entity) => {
    let newData = { ...ingredients };

    const entityIndex = newData[entity.type].findIndex(
      (e) => e.id === entity.id
    );

    newData[entity.type][entityIndex] = entity;

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

  return (
    <div className="view">
      <div className="sections">
        {entityTypes.map((type, index) => {
          return (
            <EntityListBox
              key={index}
              type={type}
              data={ingredients[type]}
              header={type + "s"}
              addEntityCallback={(type) => addEntityCallback(type)}
              generateEntityCallback={(data, setGenerating) =>
                generateEntityCallback(type, data, setGenerating)
              }
              editEntityCallback={(data) => editEntityCallback(data)}
              deleteEntityCallback={(data) => deleteEntityCallback(data)}
              moveEntityCallback={(entity, up) => moveEntity(entity, up)}
              handleImport={importEntityList}
            />
          );
        })}
      </div>
      <div className={"importExportButtons"}>
        <button className={"importButton"} onClick={() => importJson()}>
          Import All
        </button>
        <button className={"exportButton"} onClick={() => exportHandler()}>
          Export All
        </button>
      </div>
    </div>
  );
}

export default Ingredients;
