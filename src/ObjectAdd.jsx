import styles from "./Modals.module.css";

function ObjectAdd(props) {
  const addObject = () => {
    props.onConfirm();
  };

  return (
    <div className={styles.modal}>
      <p>Test</p>
      <button onClick={addObject}>Accept</button>
      <button onClick={props.onCancel}>Close</button>
    </div>
  );
}

export default ObjectAdd;
