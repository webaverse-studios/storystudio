import React from "react";
import "./App.css";

const ContextSelector = ({
  data,
  currentContentType,
  setCurrentContentType,
}) => {
  console.log("ContextSelector is", data);
  return (
    <div className="sectionWrapper context_wrapped">
      <div className="context-group">
        {Object.keys(data ?? []).map((type, index) => {
          return (
            <button
              key={index}
              onClick={(e) => setCurrentContentType(type)}
              className={
                "context-group-button" +
                (type === currentContentType
                  ? " context-group-button-active"
                  : " context-group-button-inactive")
              }
            >
              {type}|
              {(data[currentContentType] &&
                Object.keys(data[currentContentType]).length) ||
                (data[type]["examples"] && data[type]["examples"].length)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContextSelector;
