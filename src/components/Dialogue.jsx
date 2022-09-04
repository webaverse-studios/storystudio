import React, { useContext, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForever from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ApplicationContext } from "../Context";
import MonacoEditor from "@monaco-editor/react";

//field check if image, set source the img, if name change, generate new image
const Dialogue = ({ index, _key, type, editJson }) => {
  const [lastSelector, setLastSelector] = useState(null);
  const [lastCursor, setLastCursor] = useState(null);
  function handleChange(data, selector) {
    console.log("data, selector", data, selector);
    editDialogueCallback(data, selector, _key, index);
  }
  function DisplayJSONAsEditableForm({
    data,
    allData,
    type,
    label = "",
    selector = "",
  }) {
    const { entities } = useContext(ApplicationContext);

    let output = null;
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        output = data.map((item, index) => {
          return (
            <div style={{ marginLeft: "2em" }} key={index}>
              <DisplayJSONAsEditableForm
                key={index}
                type={type}
                data={item}
                allData={allData}
                selector={selector + (selector !== "" ? "." : "") + index}
              />
            </div>
          );
        });
      } else {
        output = Object.keys(data).map((key, index) => {
          return (
            <div style={{ marginLeft: "2em" }} key={index}>
              <DisplayJSONAsEditableForm
                key={index}
                type={type}
                label={key}
                data={data[key]}
                allData={allData}
                selector={selector + (selector !== "" ? "." : "") + key}
              />
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
      console.log("type is", type);
      console.log("*** data is", data);
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
            {(type === "loreExposition"
              ? [
                  ...entities["character"],
                  ...entities["object"],
                  ...entities["setting"],
                  ...entities["npc"],
                ]
              : entities[
                  type.replace("loading", "setting").replace("Comment", "")
                ]
            ).map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    // render outputs as an input field
    else if (label === "message" || label === "action" || label === "comment") {
      console.log("comment is", data);
      output = (
        <input
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

    // else if (label === "speaker"){
    //   console.log('allData', allData.current);
    //   output = (
    //     // render a dropdown selection based on allData.input.characters
    //     <select
    //       value={data}
    //       onChange={(e) => {
    //         data = e.target.value;
    //       }}
    //     >
    //       {[...allData.current.input.characters, ...allData.current.input.npcs].map((item, index) => {
    //         return (
    //           <option key={index} value={item}>
    //             {item}
    //           </option>
    //         );
    //       }
    //       )}
    //     </select>
    //   )
    // }
    else if (label === "setting") {
      output = (
        <select
          value={data}
          onChange={(e) => {
            data = e.target.value;
            handleChange(data, selector);
          }}
        >
          {entities[label].map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      );
    }

    // if the label is "objects", render a react-tag-input
    if (label === "objects" || label === "npcs" || label === "characters") {
      console.log("data", data);
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
              data.push(data[data.length - 1] || "New");
              handleChange(data, selector);
            }}
          >
            Add
          </button>
        </div>
      );
    }

    // if label is target, render a dropdown select

    return (
      <div>
        {label}

        {output}
      </div>
    );
  }

  let audioPlayer = null;
  const [shouldDelete, setShouldDelete] = React.useState(false);

  const {
    editDialogueCallback,
    deleteDialogueCallback,
    dialogue,
    currentDialogueType,
    editDialogueJson,
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
              deleteDialogueCallback(
                dialogue[currentDialogueType][_key],
                index
              ) | setShouldDelete(false)
            }
          >
            <DeleteForever />
          </button>
        </span>
      )}
      {typeof dialogue[currentDialogueType][_key] === "object" && (
        <React.Fragment>
          {!editJson ? (
            <MonacoEditor
              width="100%"
              height="200%"
              language="javascript"
              theme="light"
              value={JSON.stringify(dialogue[currentDialogueType][_key])}
              onChange={(value) => {
                editDialogueJson(JSON.parse(value), _key);
              }}
            />
          ) : (
            DisplayJSONAsEditableForm({
              data: dialogue[currentDialogueType][_key],
              allData: dialogue,
              type,
            })
          )}
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
