import React, { useEffect } from "react";
import "../styles/App.css";
import { views, briefViews } from "../utils/constants";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const Header = () => {
  const editMode = new URLSearchParams(window.location.search).get("edit");
  const showUI = window.location.search.includes("showui");

  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="logo" width="48px" height="48px" />
        <h1>Story Studio</h1>
      </div>
      <div className="headerright">
      <nav>
        {/*<button onClick={_setDarkMode}>
          {_darkMode ? "Light Mode" : "Dark Mode"}
        </button>*/}
        {/* for each key in views (an object) create a button that calls setCurrentView with the view's value, and is active if the currentView is current button */}
        {Object.keys(showUI ? views : briefViews).map((key, index) => {
          if ((editMode === "false" || !editMode) && key === "base")
            return null;
          return (
            <NavLink to={views[key]}
              key={key}
              className={isActive =>
                "viewButton " + (isActive ? "activeButton" : "")
              }
            >
              {views[key]}
            </NavLink>
            );
          })}
          </nav>
      </div>
    </div>
  );
};

export default Header;
