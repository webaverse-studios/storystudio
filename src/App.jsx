import { useEffect, useState } from "react";
import "./App.css";
import { contextTypes, defaultIngredients, views } from "./constants";
import { generate } from "./utils/openai_utils";
import Header from "./Header";
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
import ErrorModal from "./ErrorModal";

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
  const [baseData, setBaseData] = useState({
    base: null,
    url: "./lore-model.js", // "https://webaverse.github.io/lore/lore-model.js",
    type: "url",
    module: {},
  });
  const [errorDialogData, setErrorDialogData] = useState({
    on: false,
    msg: "",
  });

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  const handleImport = (data) => {
    setIngredients(data);
  };

  const handleExport = () => {
    try {
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
    } catch (e) {
      console.log(e);
      openErrorDialog("Error exporting json data");
    }
  };

  const setBase = (data) => {
    console.log("local storage handler goes here...");
    setBaseData(data);
  };

  const openErrorDialog = (msg) => {
    setErrorDialogData({ on: true, msg: msg });
  };
  const closeErrorDialog = () => {
    setErrorDialogData({ on: false, msg: "" });
  };

  return (
    <div className="App">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {currentView === "setup" ? (
        <GettingStarted />
      ) : currentView === "base" ? (
        <LoreBase data={baseData} setData={setBase} loadBaseData={loadBaseData}/>
      ) : currentView === "files" ? (
        <LoreFiles />
      ) : currentView === "map" ? (
        <MapView />
      ) : (
        <Ingredients
          importHandler={(data) => handleImport(data)}
          exportHandler={() => handleExport()}
          ingredients={ingredients}
          setIngredients={setIngredients}
          baseData={baseData}
          setBaseData={setBaseData}
          openErrorDialog={openErrorDialog}
        />
      )}
      {errorDialogData &&
        errorDialogData.on &&
        errorDialogData.msg?.length > 0 && (
          <ErrorModal
            close={closeErrorDialog}
            info={"Error: " + errorDialogData.msg}
          ></ErrorModal>
        )}
    </div>
  );
}

export default App;
