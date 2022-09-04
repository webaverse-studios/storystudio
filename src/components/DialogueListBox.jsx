import React, { useContext } from "react";
import "../styles/App.css";
import Dialogue from "./Dialogue";
import {ApplicationContext} from '../Context';

const DialogueListBox = ({
  header = "dialogue",
  /* It's a string that is used to identify the type of dialogue. */
  type = "",
  
}) => {
  const [generating, setGenerating] = React.useState(false);

  const {
    addDialogueCallback,
    generateDialogueCallback,
    ingredients,
    dialogue,
    currentDialogueType
   } = useContext(ApplicationContext);

  return (
    <div className={"sectionWrapper " + header + "_wrapped"}>
      <div className={"sectionHeader " + currentDialogueType + "_header"}>
        <h1>{header}</h1>
        <div style={{ display: "inline-block", float: "right" }}>
        <button onClick={() => generateDialogueCallback(dialogue, setGenerating)}>
          {!generating ? "Generate" : "Generating..."}
        </button>
      <button onClick={() => addDialogueCallback(type)}>
        Add
      </button>
      </div>
      </div>
      <div className={"section " + currentDialogueType}>
        {Object.keys(dialogue[currentDialogueType]).map((key, index) => {
            return (
              <Dialogue
                ingredients={ingredients}
                key={index}
                index={index}
                data={dialogue[currentDialogueType][key]}
                type={currentDialogueType}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DialogueListBox;
