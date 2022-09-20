import React, { useContext } from "react";
import "../styles/App.css";
import Entity from "./Entity";
import { ApplicationContext } from "../Context";
import { getFile } from "./getFile";

const EntityListBox = ({ header, type }) => {
  const {
    entities,
    addEntityCallback,
    generateEntityCallback,
    editEntityCallback,
    deleteEntityCallback,
    moveEntityCallback,
    handleImport,
    exportLoreMD,
    loreFiles,
  } = useContext(ApplicationContext);

  const [generating, setGenerating] = React.useState(false);

  const _import = async () => {
    const file = await getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    handleImport(type, json);
  };

  return (
    <div className={"sectionWrapper " + header + "_wrapped"}>
      <div className={"sectionHeader " + type + "_header"}>
        <h1>{header}</h1>
        <div style={{ display: "inline-block", float: "right" }}>
          {type === "lore" ||
          type === "character" ||
          type === "npc" ||
          type === "mob" ||
          type === "location" ||
          type === "object" ? (
            <button onClick={_import}>Import</button>
          ) : null}
          <button
            onClick={() =>
              /* It's calling the generateEntityCallback function from the context and
        passing in the data[type] object. */
              generateEntityCallback(type, entities, setGenerating)
            }
          >
            {!generating ? "Generate" : "Generating..."}
          </button>
          <button onClick={() => addEntityCallback(type)}>Add</button>
          {type === "loreFiles" ? (
            <button onClick={exportLoreMD}>Export MD</button>
          ) : null}
        </div>
      </div>
      <div className={"section " + type}>
        {entities &&
          Object.keys(
            type === "loreFiles" ? loreFiles : entities[type] || entities
          ).map((key, index) => {
            return (
              <div key={index}>
                <Entity
                  data={
                    type === "loreFiles"
                      ? loreFiles[key]
                      : (entities[type] || entities)[key]
                  }
                  editEntityCallback={editEntityCallback}
                  deleteEntityCallback={() =>
                    deleteEntityCallback(
                      (entities[type] || entities)[key],
                      index,
                      type
                    )
                  }
                  moveEntityCallback={(entity, up) =>
                    moveEntityCallback(entity, up)
                  }
                  index={index}
                  type={type}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EntityListBox;