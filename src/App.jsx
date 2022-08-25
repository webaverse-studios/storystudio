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


if (!localStorage.getItem('entityData') || localStorage.getItem('entityData') === '[object Object]') {
  localStorage.setItem('entityData', JSON.stringify(defaultEntityData));
}
const storedEntityData = JSON.parse(localStorage.getItem('entityData'));

function App() {
  const [entityData, setEntityData] = useState(storedEntityData);
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);
  const [baseData, setBaseData] = useState({
    base: "./src/lore-model.js",
    type: "url",
    funcs: {},
  });

  useEffect(() => {
    localStorage.setItem('entityData', JSON.stringify(entityData));
  }, [entityData])

  const addEntityCallback = async (entityType, data) => {
    // generate new using openai callback
    const entity = await generate(entityType, data, baseData);
    if (!entity || entity === undefined) {
      return;
    }

    const newEntityData = { ...entityData };

    const array = entityType === 'dialog' ? newEntityData[entityType][currentContentType] : newEntityData[entityType];
    array.push(entity);
    newEntityData[entityType][currentContentType] = array;

    setEntityData(newEntityData);
  };
  const deleteEntityCallback = (entity) => {
    const newData = { ...entityData };
    newData[entity.type] = entityData[entity.type].filter(
      (e) => e.id !== entity.id
    );
    setEntityData(newData);
  };

  const editEntityCallback = (entity) => {
    const newData = { ...entityData };

    const entityIndex = newData[entity.type].findIndex(
      (e) => e.id === entity.id
    );
    newData[entity.type][entityIndex] = entity;

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
    console.log("set base", data);
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
        {/* map entityPrototypesMap to ListBox react components */}
        {entityPrototypes.map((entity, index) => {
          return (
            <ListBox
              key={index}
              type={entity.type}
              data={entityData[entity.type]}
              header={entity.type + "s"}
              addEntityCallback={(data) => addEntityCallback(entity.type, data)}
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
        {console.log("xx entityData.dialog[currentContentType]", entityData.dialog[currentContentType])}
        <ListBox
          type={"dialog"}
          data={entityData.dialog[currentContentType]}
          header={"dialog"}
          addEntityCallback={(data) => addEntityCallback("dialog", data)}
          editEntityCallback={(data) => editEntityCallback(data)}
          deleteEntityCallback={(data) => deleteEntityCallback(data)}
        />
      </div>
    </div>
  );
}

export default App;
