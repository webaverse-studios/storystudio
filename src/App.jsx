import { useEffect, useState } from "react";
import "./App.css";
import { entityPrototypes, contextTypes, defaultEntityData } from "./constants";
import Header from "./Header";
import ListBox from "./ListBox";
import Context from "./ContextSelector";

function App() {
  const [entityData, setEntityData] = useState(defaultEntityData);
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);
  const [baseData, setBaseData] = useState({base: './src/lore-model.js', type: 'url', json: {}});

  useEffect(() => {
    console.log("entityData changed", entityData);
  }, [entityData]);

  const addEntityHandler = (type) => {
    setModalData({ type: type, mode: 'add', data: {} });
  };
  const addEntityCallback = (entity) => {
    closeModal();
    console.log("addEntityHandler", entity);
    for (let i = 0; i < entityData[entity.type].length; i++) {
      if (
        entityData[entity.type][i].name == entity.name &&
        entityData[entity.type][i].shortname == entity.shortname
      ) {
        return;
      }
    }

    const newEntityData = { ...entityData };
    newEntityData[entity.type].push(entity);
    setEntityData(newEntityData);
  };

  const deleteEntityHandler = (entity) => {
    console.log("deleteEntityHandler", entity);
    const newData = { ...entityData };
    newData[entity.type] = entityData[entity.type].filter(
      (e) => e.name !== entity.name
    );
    setEntityData(newData);
  };
  const editEntityHandler = (entity) => {
    if (modalIsOpen) {
      return;
    }

    setModalData({ type: entity.type, edit: true, data: entity });
  };
  const editEntityCallback = (oldEntity, entity) => {
    console.log("entity:", entity);
    closeModal();
    console.log("editEntityHandler", entity);
    const newData = { ...entityData };
    for (let i = 0; i < newData[entity.type].length; i++) {
      if (newData[entity.type][i] === oldEntity) {
        newData[entity.type][i] = entity;
      }
    }
    setEntityData(newData);
  };
  const closeModal = () => {
    setModalData(null);
  };

  const handleImport = () => {
    console.log("import");
  }

  const handleExport = () => {
    console.log("export");
  }

  const setBase = (data) => {
    console.log("set base", data);
    setBaseData(data);
  }


  return (
    <div className="App">
      <Header importHandler={() => handleImport()} exportHandler={() => handleExport()} data={baseData} setData={setBase} />
      <div className="sections">
        {/* map entityPrototypesMap to ListBox react components */}
        {entityPrototypes.map((entity, index) => {
          return (
            <ListBox
              key={index}
              type={entity.type}
              data={entityData[entity.type]}
              header={entity.type + "s"}
              addEntityHandler={(data) => addEntityHandler(data)}
              editEntityHandler={(data) => editEntityHandler(data)}
              deleteEntityHandler={(data) => deleteEntityHandler(data)}
            />
          );
        })}
        <Context data={entityData.data} currentContentType={currentContentType} setCurrentContentType={setCurrentContentType} />
        <ListBox
              type={'output'}
              data={entityData.data[currentContentType]}
              header={"output"}
              addEntityHandler={(data) => addEntityHandler(data)}
              editEntityHandler={(data) => editEntityHandler(data)}
              deleteEntityHandler={(data) => deleteEntityHandler(data)}
            />
      </div>
    </div>
  );
}

export default App;
