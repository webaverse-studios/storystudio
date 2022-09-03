import React from "react";
import "../styles/App.css";

const ContextSelector = ({
  data,
  currentContentType,
  setCurrentContentType,
}) => {
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
              {(data[type] && data[type].length) ||
                (data[type]["examples"] && data[type]["examples"].length)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContextSelector;
