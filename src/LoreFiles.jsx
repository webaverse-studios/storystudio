import "./styles/App.css";
import { generate } from "./utils/generation";
import ListBox from "./components/ListBox";
import { getFile } from "./components/getFile";
import { makeId } from "./utils/utils";
import JSZip from "jszip";

function LoreFiles({
  dataType,
  baseData,
  ingredients,
  setIngredients,
  loreFiles,
  setLoreFiles,
  exportHandler,
  importHandler,
  openErrorDialog,
}) {
  const generateEntityCallback = async (setGenerating) => {
    setGenerating(true);
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = await generate(
      "lore",
      ingredients,
      baseData,
      openErrorDialog,
      []
    );
    if (!entity) {
      console.error("could not generate entity");
      setGenerating(false);
      return;
    }
    console.log("generate entity", entity);
    if (typeof entity === Array) {
      if (entity[0]) entity = entity[0];
    }
    // if entity is an object, check if it has an id, if not, make one
    if (typeof entity === "object" && !entity.id) {
      entity.id = makeId(5);
    }
    const newEntityData = [...loreFiles];
    console.log("newEntityData is", newEntityData);
    newEntityData.unshift(entity);

    setLoreFiles(newEntityData);
    setGenerating(false);
  };
  const deleteEntityCallback = (entity, fromCurrentContentType, index) => {
    let newData = [...loreFiles];
    if (
      index !== null &&
      index !== undefined &&
      index >= 0 &&
      index < newData.length
    ) {
      // remove newData[index]
      newData.splice(index, 1);
      console.log("splice");
    } else {
      if (fromCurrentContentType) {
        newData = loreFiles.filter((e) => e === entity);
      } else {
        newData = loreFilesfilter((e) => e !== entity);
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

  const importJson = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    importHandler(json);
  };

  const importEntityList = async () => {
    console.log("import");
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    const index = loreFiles.findIndex((e) => e === json);
    if (index !== -1) {
      return;
    }

    const newData = [...loreFiles];
    newData.unshift(json);
    setLoreFiles(newData);
  };

  const downloadFileHandler = (data, fileName) => {
    const element = document.createElement("a");
    const file = new Blob([data], { type: "application/text" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const exportMassMD = async () => {
    const data = [...loreFiles];
    const zip = new JSZip();
    for (let i = 0; i < data.length; i++) {
      zip.file(
        `lore_${i}.md`,
        typeof data[i] === "string" ? data[i] : data[i][0]
      );
    }
    const element = document.createElement("a");
    const file = await zip.generateAsync({ type: "blob" });
    element.href = URL.createObjectURL(file);
    element.download = "lores_" + Date.now() + ".zip";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const addEmpty = () => {
    //console.log("calling baseData", baseData);
    // generate new using openai callback
    let entity = ["test"];
    console.log("generate entity", entity);
    if (typeof entity === Array) {
      if (entity[0]) entity = entity[0];
    }
    // if entity is an object, check if it has an id, if not, make one
    if (typeof entity === "object" && !entity.id) {
      entity.id = makeId(5);
    }
    const newEntityData = [...loreFiles];
    console.log("newEntityData is", newEntityData);
    newEntityData.unshift(entity);

    setLoreFiles(newEntityData);
  };

  return (
    <div className="view">
      <div className="sections">
        <ListBox
          type={dataType}
          data={loreFiles}
          header={dataType}
          generateEntityCallback={(data, setGenerating) => {
            generateEntityCallback(setGenerating);
          }}
          editEntityCallback={editEntityCallback}
          deleteEntityCallback={(data, index) =>
            deleteEntityCallback(data, true, index)
          }
          moveEntityCallback={(entity, up) => moveEntity(entity, up)}
          handleImport={importEntityList}
          addEmpty={addEmpty}
        />
      </div>
      <div className={"importExportButtons"}>
        <button className={"importButton"} onClick={() => importJson()}>
          Import All
        </button>
        <button className={"exportButton"} onClick={() => exportHandler()}>
          Export All
        </button>
        <button className={"exportButton"} onClick={() => exportMassMD()}>
          Export MDs as ZIP
        </button>
      </div>
    </div>
  );
}

export default LoreFiles;
