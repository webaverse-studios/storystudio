import "../styles/App.css";

function ErrorModal(props) {
  return (
    <div>
      <div className="modal">
        {props.info}
        <br />
        <br />
        <button onClick={props.close}>OK</button>
      </div>
      <div className="backdrop" onClick={props.close} />;
    </div>
  );
}

export default ErrorModal;
