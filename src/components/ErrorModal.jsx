import "../styles/App.css";
import React, { useContext } from "react";
import { ApplicationContext } from "../Context";

function ErrorModal(props) {
  const { errorDialogData, closeErrorDialog} = useContext(ApplicationContext);

  return errorDialogData && errorDialogData.on && errorDialogData.msg ? (
    <div>
      <div className="modal">
      {"Error: " + errorDialogData.msg}
        <br />
        <br />
        <button onClick={closeErrorDialog}>OK</button>
      </div>
      <div className="backdrop" onClick={props.close} />;
    </div>
  ) : null;
}

export default ErrorModal;
