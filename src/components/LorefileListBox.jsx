import React, { useContext } from "react";
import "../styles/App.css";
import Entity from "./Entity";
import { ApplicationContext } from "../Context";

const EntityListBox = ({
  header,
  type,
}) => {
  const { 
    entities,
    addEntityCallback,
    generateEntityCallback,
    editEntityCallback,
    deleteEntityCallback,
    moveEntityCallback,
    handleImport
  } = useContext(ApplicationContext);

  const [generating, setGenerating] = React.useState(false);

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
          <button onClick={handleImport}>Import </button>
        ) : null}
        <button onClick={() => generateEntityCallback(data[type], setGenerating)}>
          {!generating ? "Generate" : "Generating..."}
        </button>
      <button onClick={() => addEntityCallback(type)}>
        Add
      </button>
      </div>
      </div>
      <div className={"section " + type}>
        {entities && Object.keys(entities[type] || entities).map((key, index) => {
            return (
              <Entity
                key={index}
                index={index}
                data={(entities[type] || entities)[key]}
                editEntityCallback={editEntityCallback}
                deleteEntityCallback={deleteEntityCallback}
                moveEntityCallback={(entity, up) =>
                  moveEntityCallback(entity, up)
                }
                type={type}
              />
            );
          })}
      </div>
    </div>
  );
};

export default EntityListBox;
