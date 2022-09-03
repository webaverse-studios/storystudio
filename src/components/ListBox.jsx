import React from "react";
import "../styles/App.css";
import Entity from "../Entity";

const ListBox = ({
  header,
  data,
  type = "",
  addEntityCallback,
  editEntityCallback,
  deleteEntityCallback,
  showLabels = false,
  moveEntityCallback,
  handleImport,
  addEmpty,
}) => {
  const [generating, setGenerating] = React.useState(false);

  return (
    <div className={"sectionWrapper " + header + "_wrapped"}>
      <div className={"sectionHeader " + type + "_header"}>
        <h1>{header}</h1>
        {type === "lore" ||
        type === "character" ||
        type === "npc" ||
        type === "mob" ||
        type === "setting" ||
        type === "object" ? (
          <button onClick={handleImport}>Import </button>
        ) : null}
        <button onClick={() => addEntityCallback(data, setGenerating)}>
          {!generating ? "Generate" : "Generating..."}
        </button>
        {type !== "lorebase" ? (
          <button
            onClick={() => {
              addEmpty(type);
            }}
          >
            Add
          </button>
        ) : null}
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
                showLabels={showLabels}
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

export default ListBox;
