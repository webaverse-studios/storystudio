import React from "react";
import "../styles/App.css";
import Dialogue from "./Dialogue";

const DialogueListBox = ({
  header = "dialogue",
  data,
  /* It's a string that is used to identify the type of dialogue. */
  type = "",
  addDialogueCallback,
  generateDialogueCallback,
  editDialogueCallback,
  deleteDialogueCallback,
  moveDialogueCallback,
  ingredients,
  handleImport
}) => {
  const [generating, setGenerating] = React.useState(false);

  return (
    <div className={"sectionWrapper " + header + "_wrapped"}>
      <div className={"sectionHeader " + type + "_header"}>
        <h1>{header}</h1>
        <div style={{ display: "inline-block", float: "right" }}>
        <button onClick={() => generateDialogueCallback(data, setGenerating)}>
          {!generating ? "Generate" : "Generating..."}
        </button>
      <button onClick={() => addDialogueCallback(type)}>
        Add
      </button>
      </div>
      </div>
      <div className={"section " + type}>
        {Object.keys(data[type]).map((key, index) => {
            return (
              <Dialogue
                ingredients={ingredients}
                key={index}
                index={index}
                data={data[type][key]}
                editDialogueCallback={editDialogueCallback}
                deleteDialogueCallback={deleteDialogueCallback}
                moveDialogueCallback={(dialogue, up) =>
                  moveDialogueCallback(dialogue, up)
                }
                type={type}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DialogueListBox;
