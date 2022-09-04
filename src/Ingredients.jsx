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
    ingredients,
    setIngredients,
    addEntityCallback,
    generateEntityCallback,
    deleteEntityCallback,
    editEntityCallback,
    moveEntity,
    importEntityList,
    addLore
  } = useContext(ApplicationContext);

  return (
    <div className="view">
      <div className="sections">
        {entityTypes.map((type, index) => {
          return (
            <EntityListBox
              data={ingredients}
              key={index}
              type={type}
              header={type + "s"}
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
