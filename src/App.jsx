import { useEffect, useState } from "react";
import "./App.css";
import { getScript, setup_scripts } from "./utils/script_handler";
import { entityPrototypes, defaultEntities } from "./constants";
import Header from "./Header";
import ListBox from "./ListBox";
import Context from "./ContextEditor";
import Generator from "./ContextGenerator";

function App() {
  const [entityData, setEntityData] = useState(defaultEntities);

  useEffect(() => {
    console.log('entityData changed', entityData);
  }, [entityData]);

  useEffect(() => {
    const f = async () => {
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
    f();
  });

  const addEntityHandler = (entity) => {
    console.log("addEntityHandler", entity);
    const newEntityData = { ...entityData };
    newEntityData[entity.type].push(entity);
    setEntityData(newEntityData);
  }

  const deleteEntityHandler = (entity) => {
    console.log("deleteEntityHandler", entity);
    const newData = { ...entityData };
    newData[entity.type] = entityData[entity.type].filter(e => e.name !== entity.name);
    setEntityData(newData);
  }
  const editEntityHandler = (entity) => {
    console.log("editEntityHandler", entity);
    const newData = { ...entityData };
    newData[entity.type] = entity;
    setEntityData(newData);
  }

  return (
    <div className="App">
      <Header />
      <div className="sections">
      {/* map entityPrototypesMap to ListBox react components */}
      {entityPrototypes.map((entity, index) => {
        return (
          <ListBox key={index} type={entity.type} data={entityData[entity.type]} header={entity.type + 's'} addEntityHandler={(data) => addEntityHandler(data)} editEntityHandler={(data) => editEntityHandler(data)} deleteEntityHandler={(data) => deleteEntityHandler(data)} />
        );
      })
      }
      <Context />
      <Generator />
      </div>
    </div>
  );
}

export default App;
