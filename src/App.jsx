import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import DialogueListBox from "./components/DialogueListBox";
import DialogueSelector from "./components/DialogueSelector";
import ErrorModal from "./components/ErrorModal";
import { ApplicationContextProvider } from "./ContextProvider";
import LoreBase from "./LoreBase";
import LoreFiles from "./LoreFiles";
import Setup from "./Setup";
import "./styles/App.css";
import { DndProvider } from "react-dnd";

import Header from "./components/Header";
import EntityListBox from "./components/EntityListBox";
import { ApplicationContext } from "./Context";
import "./styles/App.css";
import { entityTypes } from "./utils/constants";
import { HTML5Backend } from "react-dnd-html5-backend";

export const views = {
  setup: "Setup",
  base: "Base",
  settings: "Settings",
  characters: "Characters",
  npcs: "NPCs",
  objects: "Objects",
  dialogue: "Dialogue",
  loreFiles: "Lorefiles",
};

function App() {
  return (
    <ApplicationContextProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route path="Setup" element={<Setup />} />
              <Route path="Base" element={<LoreBase />} />
              <Route
                path="Settings"
                element={<EntityListBox type={"setting"} header={"Settings"} />}
              />
              <Route
                path="Characters"
                element={
                  <EntityListBox type={"character"} header={"Characters"} />
                }
              />
              <Route
                path="NPCs"
                element={<EntityListBox type={"npc"} header={"NPCs"} />}
              />
              <Route
                path="Objects"
                element={<EntityListBox type={"object"} header={"Objects"} />}
              />
              <Route
                path="Mobs"
                element={<EntityListBox type={"mob"} header={"Mobs"} />}
              />
              <Route
                path="Lorefiles"
                element={
                  <EntityListBox type={"loreFiles"} header={"Lorefiles"} />
                }
              />

              <Route
                path="Dialogue"
                element={
                  <React.Fragment>
                    <DialogueSelector />
                    <DialogueListBox />
                  </React.Fragment>
                }
              />
            </Routes>
          </Router>
          <ErrorModal />
        </div>
      </DndProvider>
    </ApplicationContextProvider>
  );
}

export default App;
