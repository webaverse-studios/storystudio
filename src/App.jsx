import { useEffect, useState } from "react";
import "./App.css";
import { entityPrototypes, contextTypes, defaultIngredients, views, lore } from "./constants";
import { generate } from "./utils/openai_utils";
import Header from "./Header";
import ListBox from "./ListBox";
import Context from "./ContextSelector";
import Ingredients from "./Ingredients";
import GettingStarted from "./GettingStarted";
import LoreFiles from "./LoreFiles";
import LoreBase from "./LoreBase";
import MapView from "./MapView";
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
  !localStorage.getItem("ingredients") ||
  localStorage.getItem("ingredients") === "[object Object]"
) {
  localStorage.setItem("ingredients", JSON.stringify(defaultIngredients));
}
const storedEntityData = JSON.parse(localStorage.getItem("ingredients"));

function App() {
  const [currentView, setCurrentView] = useState(Object.keys(views)[0]);
  const [ingredients, setIngredients] = useState(storedEntityData);
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);
  const [loreExamples, setLoreExamples] = useState(lore);
  const [baseData, setBaseData] = useState({
    base: null,
    url: "./lore-model.js", // "https://webaverse.github.io/lore/lore-model.js",
    type: "url",
    module: {},
  });

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

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

      const newEntityData = { ...ingredients };

      const array =
        entityType === "dialog"
          ? newEntityData[entityType][currentContentType]
          : newEntityData[entityType];
      array.push(entity);
      newEntityData[entityType][currentContentType] = array;

      setIngredients(newEntityData);
    } catch (e) {
      console.error(e);
      addEntityCallback(entityType, data, setGenerating, tries);
    }
    setGenerating(false);
  };
  const deleteEntityCallback = (entity, dialog) => {
    const newData = { ...ingredients };
    if (dialog) {
      newData["dialog"][currentContentType] = ingredients["dialog"][
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

  const setBase = (data) => {
    console.log('local storage handler goes here...');
    setBaseData(data);
  };

  return (
    <div className="App">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {
        currentView === "gettingStarted" ? <GettingStarted /> :
        currentView === "base" ? <LoreBase examples={loreExamples} setExamples={setLoreExamples} data={baseData} setData={setBase} /> :
        currentView === "files" ? <LoreFiles /> :
        currentView === "map" ? <MapView /> :
        <Ingredients
        importHandler={(data) => handleImport(data)}
        exportHandler={() => handleExport()}
        ingredients={ingredients}
        setIngredients={setIngredients}
        baseData={baseData}
        setBaseData={setBaseData}
      />
      }
    </div>
  );
}

export default App;
