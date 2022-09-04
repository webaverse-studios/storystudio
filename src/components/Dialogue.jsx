import React, { useContext, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForever from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {ApplicationContext} from '../Context';



//field check if image, set source the img, if name change, generate new image
const Dialogue = ({
  index,
  _key,
  type,
}) => {
  const [lastSelector, setLastSelector] = useState(null);
  const [lastCursor, setLastCursor] = useState(null);
  function handleChange (data, selector) { console.log('data, selector', data, selector); editDialogueCallback(data, selector, _key, index)}
  function DisplayJSONAsEditableForm({ data, allData, type, label = "", selector = '' }) {
    const {
      entities
     } = useContext(ApplicationContext);
  
    let output = null;
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        output = data.map((item, index) => {
          return (
            <div style={{marginLeft:"2em"}} key={index}>
              <DisplayJSONAsEditableForm key={index} type={type} data={item} allData={allData} selector={selector + (selector !== '' ? '.' : '') + index} />
            </div>
          );
        });
      } else {
        output = Object.keys(data).map((key, index) => {
          return (
            <div style={{marginLeft:"2em"}} key={index}>
              <DisplayJSONAsEditableForm key={index} type={type} label={key} data={data[key]} allData={allData} selector={selector + (selector !== '' ? '.' : '') + key} />
            </div>
          );
        });
      }
    }
  
    else if (label === "target") {
      console.log('type is', type);
      console.log('*** data is', data);
        return (
          <div>
            <label>{label}</label>
            {/* render a select dropdown with all of the entities for the current type */}
            <select
              value={data}
              onChange={(e) => {
                data = e.target.value;
                handleChange(data, selector);
              }}
            >
              {
                (type === 'loreExposition' ? 
                [...entities['character'], ...entities['object'], ...entities['setting'], ...entities['npc']] :
                entities[type.replace('loading', 'setting').replace('Comment', '')]).map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              }
            )}
            </select>
  
          </div>
        );
    }
    
  
      // render outputs as an input field
    else if (label === "message" || label === "action" || label === "comment") {
      console.log('comment is', data)
      output = (
          <input
          className="dialogueInput"
            type="text"
            value={data}
            onChange={(e) => {
              setLastSelector(selector);
              // get the position in the input field and call setLastCursor(position)
              setLastCursor(e.target.selectionStart);
              handleChange(e.target.value, selector);
            }}
            autoFocus={lastSelector === selector}
          />
      );
    }
  
    else if (label === "speaker"){
      output = (
        // render a dropdown selection based on allData.input.characters
        <select
          value={data}
          onChange={(e) => {
            handleChange(data, selector);
          }}
        >

          {[...dialogue[currentDialogueType][_key].input.characters, ...dialogue[currentDialogueType][_key].input.npcs].map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          }
          )}
        </select>
      )
    }
  
    else if (label === "setting"){
      output = (
        <select
          value={data}
          onChange={(e) => {
            data = e.target.value;
            handleChange(data, selector);
          }
        }>
          {entities[label].map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            );
          }
          )}
        </select>
      )
    }
  
    // if the label is "objects", render a react-tag-input
    if (label === "objects" || label === "npcs" || label === "characters") {
      console.log('data', data);
      output = (
        <div>
          {/* iterate through the data, and render a textarea for each item */}
          {data.map((item, index) => {
            return (
                <input
                className="tagInput"
                  type="text"
                  value={data[index]}
                  onChange={(e) => {
                    data[index] = e.target.value;
                  }}
                />
            );
          })}
          {/* add a button to add a new item */}
          <button
            onClick={() => {
              data.push(data[data.length - 1] || "New");
              handleChange(data, selector);
            }}
            style={{display: "inline"}}
          >
            +
          </button>
        </div>
      );
    }
  
    // if label is target, render a dropdown select
  
  
    return (<div style={{margin: ".5em"}}>{label}
    
    {output}
    
    </div>);
  }

  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = React.useState(false);

  const {
    editDialogueCallback,
    deleteDialogueCallback,
    dialogue,
    currentDialogueType
   } = useContext(ApplicationContext);

  return (
    <div className={"entity"}>
      {!shouldDelete && (
        <span className="entityDelete">
          <button onClick={() => setShouldDelete(true)}>
            <ClearIcon />
          </button>
        </span>
      )}
      {shouldDelete && (
        <span className="entityDelete">
          <button onClick={() => setShouldDelete(false)}>
            <ClearIcon />
          </button>
          <button
            onClick={() =>
              deleteDialogueCallback(dialogue[currentDialogueType][_key], index) | setShouldDelete(false)
            }
          >
            <DeleteForever />
          </button>
        </span>
      )}
      {typeof dialogue[currentDialogueType][_key] === "object" && (
        <React.Fragment>
          {DisplayJSONAsEditableForm({ data: dialogue[currentDialogueType][_key], allData: dialogue, type })}
        </React.Fragment>
      )}
      {/*<button onClick={() => moveDialogueCallback(data, true)}>
        <ArrowUpwardIcon />
      </button>
      <button onClick={() => moveDialogueCallback(data, false)}>
        <ArrowDownwardIcon />
          </button>*/}
    </div>
  );
};

export default Dialogue;
