import { useEffect, useState } from "react";
import "./App.css";
import { entityPrototypes, contextTypes, defaultEntityData } from "./constants";
import { generate } from "./utils/openai_utils";
import Header from "./Header";
import ListBox from "./ListBox";
import Context from "./ContextSelector";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

if (
  !localStorage.getItem("entityData") ||
  localStorage.getItem("entityData") === "[object Object]"
) {
  localStorage.setItem("entityData", JSON.stringify(defaultEntityData));
}
const storedEntityData = JSON.parse(localStorage.getItem("entityData"));

function App() {
  const [entityData, setEntityData] = useState(storedEntityData);
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);
  const [baseData, setBaseData] = useState({
    base: null,
    url: "https://webaverse.github.io/lore/lore-model.js",
    type: "url",
    funcs: {},
  });

  useEffect(() => {
    localStorage.setItem("entityData", JSON.stringify(entityData));
  }, [entityData]);

  const addEntityCallback = async (
    entityType,
    data,
    setGenerating,
    tries = 0
  ) => {
    if (tries > 5) {
      console.error("Could not generate entity");
      return;
    }
    tries++;
    setGenerating(true);
    try {
      //console.log("calling baseData", baseData);
      // generate new using openai callback
      let entity = await generate(entityType, data, baseData);
      if (entity[0]) entity = entity[0];
      console.log("generate entity", entity);
      if (!entity.id) {
        entity.id = makeId(5);
      }
      if (!entity || entity === undefined) {
        addEntityCallback(entityType, data, setGenerating, tries);
        return;
      }

      const newEntityData = { ...entityData };

      const array =
        entityType === "dialog"
          ? newEntityData[entityType][currentContentType]
          : newEntityData[entityType];
      array.push(entity);
      newEntityData[entityType][currentContentType] = array;

      setEntityData(newEntityData);
    } catch (e) {
      console.error(e);
      addEntityCallback(entityType, data, setGenerating, tries);
    }
    setGenerating(false);
  };
  const deleteEntityCallback = (entity, dialog) => {
    console.log("entity", entity);
    const newData = { ...entityData };
    console.log("entityData", entityData);
    console.log("currentContentType", currentContentType);
    console.log(
      'entityData["dialog"][entity.type]',
      entityData["dialog"][currentContentType]
    );
    console.log("entityData[entity.type]", entityData[entity.type]);

    if (dialog) {
      newData["dialog"][currentContentType] = entityData["dialog"][
        currentContentType
      ].filter((e) => e.id && e.id !== entity.id);
    } else {
      newData[entity.type] = entityData[entity.type].filter(
        (e) => e.id !== entity.id
      );
    }

    setEntityData(newData);
  };

  const editEntityCallback = (entity) => {
    let newData = { ...entityData };

    console.log("gotta edit dis entity", entity);

    if (entity.message !== undefined) {
      newData["dialog"][currentContentType];

      const entityIndex = newData["dialog"][currentContentType].findIndex(
        (e) => e.id === entity.id
      );
      newData["dialog"][currentContentType][entityIndex] = entity;
    } else {
      const entityIndex = newData[entity.type].findIndex(
        (e) => e.id === entity.id
      );
      newData[entity.type][entityIndex] = entity;
    }

    setEntityData(newData);
  };

  const handleImport = (data) => {
    setEntityData(data);
  };

  const handleExport = () => {
    const json = JSON.stringify(entityData);
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

  const setBase = (data) => {
    setBaseData(data);
  };

  return (
    <div className="App">
      <Header
        importHandler={(data) => handleImport(data)}
        exportHandler={() => handleExport()}
        data={baseData}
        setData={setBase}
      />
      <div className="sections">
        {entityPrototypes.map((entity, index) => {
          return (
            <ListBox
              key={index}
              type={entity.type}
              data={entityData[entity.type]}
              header={entity.type + "s"}
              addEntityCallback={(data, setGenerating) =>
                addEntityCallback(entity.type, data, setGenerating)
              }
              editEntityCallback={(data) => editEntityCallback(data)}
              deleteEntityCallback={(data) => deleteEntityCallback(data)}
            />
          );
        })}
        <Context
          data={entityData.dialog}
          currentContentType={currentContentType}
          setCurrentContentType={setCurrentContentType}
        />
        <ListBox
          type={"dialog"}
          data={entityData.dialog[currentContentType]}
          header={"dialog"}
          addEntityCallback={(data) => {
            console.log("entityData is", entityData);
            addEntityCallback("dialog", entityData);
          }}
          editEntityCallback={(data) => editEntityCallback(data)}
          deleteEntityCallback={(data) => deleteEntityCallback(data, true)}
          showLabels={true}
        />
      </div>
    </div>
  );
}

export default App;
