import React, { useContext } from "react";
import "../styles/App.css";
import Dialogue from "./Dialogue";
import { ApplicationContext } from "../Context";

const DialogueListBox = ({
  header = "dialogue",
  /* It's a string that is used to identify the type of dialogue. */
  type = "",
}) => {
  const [generating, setGenerating] = React.useState(false);

  const {
    addDialogueCallback,
    generateDialogueCallback,
    entities,
    dialogue,
    currentDialogueType,
  } = useContext(ApplicationContext);
  console.log("render dialogue", dialogue);
  return (
    <div className={"sectionWrapper " + header + "_wrapped"}>
      <div className={"sectionHeader " + currentDialogueType + "_header"}>
        <h1>{header}</h1>
        <div style={{ display: "inline-block", float: "right" }}>
          <button onClick={() => addDialogueCallback(currentDialogueType)}>
            Add
          </button>
        </div>
      </div>
      <div className={"section " + currentDialogueType}>
        {Object.keys(dialogue[currentDialogueType] ?? {}).map((key, index) => {
          return (
            <Dialogue
              entities={entities}
              _key={key}
              key={key}
              index={index}
              type={currentDialogueType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DialogueListBox;
