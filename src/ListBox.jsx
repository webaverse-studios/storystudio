// List editor box
// React component for editing a list of entities

import React from "react";
import "./App.css";
import Entity from "./Entity";

const ListBox = ({
  header,
  data,
  type = "",
  addEntityCallback,
  editEntityCallback,
  deleteEntityCallback,
}) => {
  return (
    <div className={"sectionWrapper " + type + "_wrapped"}>
      <div className={"sectionHeader " + type + "_header"}>
        <h1>{header}</h1>
        <button onClick={() => addEntityCallback(data)}>Add</button>
      </div>
      <div className={"section " + type}>
        {data?.map((entityData, index) => {
          return (
            <Entity
              key={index}
              entityData={entityData}
              editEntityCallback={editEntityCallback}
              deleteEntityCallback={deleteEntityCallback}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListBox;
