import React from "react";
import "../styles/App.css";
import Entity from "./Entity";

const EntityListBox = ({
  header,
  data,
  type = "",
  addEntityCallback,
  generateEntityCallback,
  editEntityCallback,
  deleteEntityCallback,
  moveEntityCallback,
  handleImport
}) => {
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
        type === "setting" ||
        type === "object" ? (
          <button onClick={handleImport}>Import </button>
        ) : null}
        <button onClick={() => generateEntityCallback(data, setGenerating)}>
          {!generating ? "Generate" : "Generating..."}
        </button>
      <button onClick={() => addEntityCallback(type)}>
        Add
      </button>
      </div>
      </div>
      <div className={"section " + type}>
        {data &&
          Object.keys(data).map((key, index) => {
            return (
              <Entity
                key={index}
                index={index}
                data={data[key]}
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
