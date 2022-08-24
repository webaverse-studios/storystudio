import styles from "./Modals.module.css";

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onClick} />;
}

export default Backdrop;
