import styles from "./Modals.module.css";

function NPCAdd(props) {
  const addNPC = () => {
    props.onConfirm();
  };

  return (
    <div className={styles.modal}>
      <p>Test</p>
      <button onClick={addNPC}>Accept</button>
      <button onClick={props.onCancel}>Close</button>
    </div>
  );
}

export default NPCAdd;
