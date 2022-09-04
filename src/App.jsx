import React, { useContext }from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import DialogueListBox from "./components/DialogueListBox";
import DialogueSelector from "./components/DialogueSelector";
import ErrorModal from "./components/ErrorModal";
import { ApplicationContextProvider } from "./ContextProvider";
import Ingredients from "./Ingredients";
import LoreBase from "./LoreBase";
import LoreFiles from "./LoreFiles";
import Setup from "./Setup";
import "./styles/App.css";

import Header from "./components/Header";

function App() {
  return (
    <ApplicationContextProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="Setup" element={<Setup />} />
            <Route path="Base" element={<LoreBase />} />
            <Route path="Builder" element={
              <React.Fragment>
                <Ingredients />
                <DialogueSelector />
                <DialogueListBox />
                <LoreFiles />
              </React.Fragment>} />
          </Routes>
        </Router>
      <ErrorModal />
      </div>
    </ApplicationContextProvider>
  );
}

export default App;
