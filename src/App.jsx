import { useEffect, useState } from "react";
import "./App.css";
import { entityPrototypes, contextTypes, defaultEntityData } from "./constants";
import Header from "./Header";
import ListBox from "./ListBox";
import Context from "./ContextEditor";
import Backdrop from "./Backdrop";
import NPCAdd from "./NPCAdd";
import ObjectAdd from "./ObjectAdd";
import CharacterAdd from "./CharacterAdd";
import MobAdd from "./MobAdd";
import SceneAdd from "./SceneAdd";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "",
    edit: false,
    data: {},
  });
  const [entityData, setEntityData] = useState(defaultEntityData);
  const [currentContentType, setCurrentContentType] = useState(contextTypes[0]);

  useEffect(() => {
    console.log("entityData changed", entityData);
  }, [entityData]);

  useEffect(() => {
    /* const setup = async () => {
      await setup_scripts();
      const hash = getScript("lore-model");
      if (hash !== undefined && hash) {
        console.log("running script");
        const res = await hash
          .call(null)
          .call(null, ["test"], [{ name: "test" }], [], [{ name: "test" }], "");
        console.log(res);
      } else {
        console.log("empty scripts");
      }
    };
    setup();*/
  });

  const addEntityHandler = (type) => {
    if (modalIsOpen) {
      return;
    }

    setModalData({ type: type, edit: false, data: {} });
    openModal();
  };
  const _addEntityHandler = (entity) => {
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
    openModal();
  };
  const _editEntityHandler = (oldEntity, entity) => {
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

  const openModal = () => {
    if (modalIsOpen) {
      return false;
    }

    setModalIsOpen(true);
    return true;
  };
  const closeModal = () => {
    if (!modalIsOpen) {
      return false;
    }

    setModalIsOpen(false);
    setModalData({ type: "", edit: false, data: {} });
    return true;
  };

  return (
    <div className="App">
      <Header />
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
        <Context
          data={entityData.data}
          currentContentType={currentContentType}
        />
        <ListBox
          data={entityData.data[currentContentType]}
          header={"output"}
          addEntityHandler={(data) => addEntityHandler(data)}
          editEntityHandler={(data) => editEntityHandler(data)}
          deleteEntityHandler={(data) => deleteEntityHandler(data)}
        />
        {modalIsOpen && modalData.type?.length > 0 && (
          <Backdrop onClick={closeModal} />
        )}
        {modalIsOpen && modalData.type === "object" ? (
          <ObjectAdd
            onConfirm={_addEntityHandler}
            onConfirmEdit={_editEntityHandler}
            onCancel={closeModal}
            edit={modalData.edit}
            data={modalData.data}
          />
        ) : modalData.type === "character" ? (
          <CharacterAdd
            onConfirm={_addEntityHandler}
            onConfirmEdit={_editEntityHandler}
            onCancel={closeModal}
            edit={modalData.edit}
            data={modalData.data}
          />
        ) : modalData.type === "npc" ? (
          <NPCAdd
            onConfirm={_addEntityHandler}
            onConfirmEdit={_editEntityHandler}
            onCancel={closeModal}
            edit={modalData.edit}
            data={modalData.data}
          />
        ) : modalData.type === "mob" ? (
          <MobAdd
            onConfirm={_addEntityHandler}
            onConfirmEdit={_editEntityHandler}
            onCancel={closeModal}
            edit={modalData.edit}
            data={modalData.data}
          />
        ) : modalData.type === "scene" ? (
          <SceneAdd
            onConfirm={_addEntityHandler}
            onConfirmEdit={_editEntityHandler}
            onCancel={closeModal}
            edit={modalData.edit}
            data={modalData.data}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
