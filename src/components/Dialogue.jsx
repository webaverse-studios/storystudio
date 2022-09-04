import React, { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForever from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {ApplicationContext} from '../Context';

function DisplayJSONAsEditableForm({ data, type, label = "", allData = null }) {
  const {
    ingredients
   } = useContext(ApplicationContext);
  allData = allData || data;
  // 1. Iterate through data, and based on it's type, render the appropriate component or recursively drill down
  // 2. If the data is an array, render a list of the data. Check the data type of the first element, and render the appropriate component
  // 3. If the data is an object, render a list of the data. Check the data type of the first element, and render the appropriate component
  // Note: Make sure to recurse through the data, since there can be objects within objects, arrays within arrays, and so on
  // return a React.Fragment with the appropriate components

  // setting is a dropdown
  // characters are tags, using react-tag-input
  // npcs are also tags, using react-tag-input
  // objects are also tags, using react-tag-input

  let output = null;
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      output = data.map((item, index) => {
        return (
          <div style={{marginLeft:"2em"}} key={index}>
            <DisplayJSONAsEditableForm type={type} data={item} allData={allData} />
          </div>
        );
      });
    } else {
      output = Object.keys(data).map((key, index) => {
        return (
          <div style={{marginLeft:"2em"}} key={index}>
            <DisplayJSONAsEditableForm type={type} label={key} data={data[key]} allData={allData} />
          </div>
        );
      });
    }
  }

  // if the key is transcript, render a textarea
  // if (label === "transcript") {
  //   return (
  //     <div>
  //       <label>{label}</label>
  //       {/* iterate through the data, and render a textarea for each item */}
  //       {data.map((item, index) => {
  //         console.log(item);
  //         return (
  //         <textarea
  //           style={{ width: "100%", height: "100px" }}
  //           value={data[index]}
  //           onChange={(e) => {
  //             item = e.target.value;
  //           }}
  //           />
  //         )
  //       })
  //     }
  //   </div>
  //   );
  // }

  else if (label === "target") {
    console.log('type is', type);
      return (
        <div>
          <label>{label}</label>
          {/* render a select dropdown with all of the ingredients for the current type */}
          <select
            value={data}
            onChange={(e) => {
              data = e.target.value;
            }}
          >
            {/*
              (type === 'loreExposition' ? 
              [...ingredients['character'], ...ingredients['object'], ...ingredients['setting'], ...ingredients['npc']] :
              ingredients[type.replace('loading', 'setting').replace('Comment', '')]).map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item.name}
                </option>
              );
            }
          ) */}
          </select>

        </div>
      );
  }
  

    // render outputs as an input field
  else if (label === "message" || label === "action" || label === "comment") {
    output = (
        <input
          type="text"
          value={data}
          onChange={(e) => {
            data = e.target.value;
          }}
        />
    );
  }

  else if (label === "character" || label === "speaker"){
    output = (
      // render a dropdown selection based on allData.input.characters
      <select
        value={data}
        onChange={(e) => {
          data = e.target.value;
        }}
      >
        {[...allData.input.characters, ...allData.input.npcs].map((item, index) => {
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
    console.log('ingredients', ingredients);
    // render a dropdown select 
    console.log('ingredients', ingredients)
    output = (
      <select
        value={data}
        onChange={(e) => {
          data = e.target.value;
        }
      }>
        {ingredients[label].map((item, index) => {
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
            data.push("");
          }}
        >
          Add
        </button>
      </div>
    );
  }

  // if label is target, render a dropdown select


  return (<div>{label}
  
  {output}
  
  </div>);
}

//field check if image, set source the img, if name change, generate new image
const Dialogue = ({
  index,
  data,
  type,
}) => {
  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = React.useState(false);

  const {
    addDialogueCallback,
    generateDialogueCallback,
    editDialogueCallback,
    deleteDialogueCallback,
    moveDialogueCallback,
    ingredients,
    dialogue,
    currentDialogueType
   } = useContext(ApplicationContext);

  const updateDialogue = (ingredients, field, data, index) => {
    if (field === "shortname") {
      return;
    }
    let newData = { ...ingredients };
    newData[field] = data;
    // needed?
    if (!field) {
      newData = data;
    }
    editDialogueCallback(newData, index);
  };

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
              deleteDialogueCallback(data, index) | setShouldDelete(false)
            }
          >
            <DeleteForever />
          </button>
        </span>
      )}
      {typeof data === "object" && (
        <React.Fragment>
          {DisplayJSONAsEditableForm({ data, type, ingredients })}
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
