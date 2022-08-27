import React, { useEffect, useState } from "react";
import "./App.css";
import { views } from "./constants"

const Header = ({ currentView, setCurrentView }) => {
  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="logo" width="48px" height="48px" />
        <h1>Story Studio</h1>
      </div>
      <div className="headerright">
        {/* for each key in views (an object) create a button that calls setCurrentView with the view's value, and is active if the currentView is current button */}
        {Object.keys(views).map((key, index) => {
          return (
            <button
              key={key}
              className={"viewButton " + (currentView === Object.keys(views)[index] ? "activeButton" : "")}
              onClick={() => setCurrentView(Object.keys(views)[index])}
            >
              {views[key]}
            </button>
          );
        })
      }
      </div>
    </div>
  );
};

export default Header;
