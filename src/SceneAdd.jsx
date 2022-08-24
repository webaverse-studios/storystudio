import { useEffect, useState } from "react";
import styles from "./Modals.module.css";

function SceneAdd(props) {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [description, setDescription] = useState("");

  const addScene = () => {
    props.onConfirm();
  };

  useEffect(() => {
    if (props.edit) {
      setName(props.data.name);
      setShortName(props.data.shortName);
      setEnabled(props.data.enabled);
      setDescription(props.data.description);
    }
  }, []);

  const generateScene = () => {
    setName("Test Scene");
    setShortName("TS");
    setEnabled(true);
    setDescription("This is a test scene");
  };

  return (
    <div className={styles.modal}>
      <label>{props.edit ? "Edit" : "Add"} Scene</label>
      <br />
      <br />
      <label>Name</label>
      <br />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Short Name</label>
      <br />
      <input
        type="text"
        placeholder="Short Name"
        value={shortName}
        onChange={(e) => setShortName(e.target.value)}
      />
      <br />
      <label>Description</label>
      <br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Inventory</label>
      <br />
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      <label>Enabled</label>
      <br />
      <br />
      {!props.edit && <button onClick={generateScene}>Generate</button>}
      <button onClick={addScene}>{props.edit ? "Edit" : "Add"}</button>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
  );
}

export default SceneAdd;
