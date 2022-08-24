import styles from "./Modals.module.css";

function PartyAdd(props) {
  const addParty = () => {
    props.onConfirm();
  };

  return (
    <div className={styles.modal}>
      <p>Test</p>
      <button onClick={addParty}>Accept</button>
      <button onClick={props.onCancel}>Close</button>
    </div>
  );
}

export default PartyAdd;
