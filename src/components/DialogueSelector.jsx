import React, { useContext } from "react";
import "../styles/App.css";
import { ApplicationContext } from "../Context";
import { dialogueTypes } from "../utils/constants";

const DialogueSelector = () => {
  const {
    dialogue,
    currentDialogueType,
    setCurrentDialogueType,
  } = useContext(ApplicationContext);

  //console.log('data', dialogue);
  return (
    <div className="sectionWrapper context_wrapped">
      <div className="context-group">
        {dialogueTypes.map((type, index) => {
          return (
            <button
              key={index}
              onClick={(e) => setCurrentDialogueType(type)}
              className={
                "context-group-button" +
                (type === currentDialogueType
                  ? " context-group-button-active"
                  : " context-group-button-inactive")
              }
            >
              {type}
              {/*|{dialogue[type] && dialogue[type].length}(*/}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DialogueSelector;
