import { useEffect, useState } from "react";
import "./App.css";
import { setup_scripts } from "./utils/script_handler";
import { entityPrototypes, defaultEntities } from "./constants";
import Header from "./Header";
import ListBox from "./ListBox";
import Context from "./ContextEditor";
import Generator from "./ContextGenerator";
import Backdrop from "./Backdrop";
import NPCAdd from "./NPCAdd";
import ObjectAdd from "./ObjectAdd";
import CharacterAdd from "./CharacterAdd";
import MobAdd from "./MobAdd";
import SceneAdd from "./SceneAdd";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [entityData, setEntityData] = useState(defaultEntities);

  useEffect(() => {
    console.log("entityData changed", entityData);
  }, [entityData]);

  useEffect(() => {
    const setup = async () => {
      await setup_scripts();
      //const hash = getScript("lore-model");
      /*if (hash !== undefined && hash) {
        console.log("running script");
        const res = await hash
          .call(null)
          .call(null, ["test"], [{ name: "test" }], [], [{ name: "test" }], "");
        console.log(res);
      } else {
        console.log("empty scripts");
      }*/
    };
    setup();
  });

  const addEntityHandler = (type) => {
    console.log(type);
    setModalType(type);
    openModal();
  };
  const _addEntityHandler = (entity) => {
    closeModal();
    console.log("addEntityHandler", entity);
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
    console.log("editEntityHandler", entity);
    const newData = { ...entityData };
    newData[entity.type] = entity;
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
    setModalType("");
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
        <Context />
        <Generator />
        {modalIsOpen && modalType?.length > 0 && <Backdrop />}
        {modalIsOpen && modalType === "object" ? (
          <ObjectAdd onConfirm={_addEntityHandler} onCancel={closeModal} />
        ) : modalType === "character" ? (
          <CharacterAdd onConfirm={_addEntityHandler} onCancel={closeModal} />
        ) : modalType === "npc" ? (
          <NPCAdd onConfirm={_addEntityHandler} onCancel={closeModal} />
        ) : modalType === "mob" ? (
          <MobAdd onConfirm={_addEntityHandler} onCancel={closeModal} />
        ) : modalType === "scene" ? (
          <SceneAdd onConfirm={_addEntityHandler} onCancel={closeModal} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
