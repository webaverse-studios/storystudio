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
  const [currentView, setCurrentView] = useState(localStorage.getItem('currentView') || Object.keys(views)[0]);
  const [ingredients, setIngredients] = useState(storedEntityData);
  const [loreData, setLoreData] = useState(lore);
  const [baseData, setBaseData] = useState({
    base: null,
    url: "./lore-model.js", // "https://webaverse.github.io/lore/lore-model.js",
    type: "url",
    module: {},
  });

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView])

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

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
        currentView === "base" ? 
        <LoreBase
          loreData={loreData} 
          setLoreData={setLoreData}
          data={baseData}
          setData={setBase}
        /> :
        currentView === "files" ? <LoreFiles /> :
        <Ingredients
          dataType={'dialog'}
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
