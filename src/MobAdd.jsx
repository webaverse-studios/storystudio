import styles from "./Modals.module.css";

function MobAdd(props) {
  const addMob = () => {
    props.onConfirm();
  };

  return (
    <div className={styles.modal}>
      <p>Test</p>
      <button onClick={addMob}>Accept</button>
      <button onClick={props.onCancel}>Close</button>
    </div>
  );
}

export default MobAdd;
