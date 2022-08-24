import { useEffect, useState } from "react";
import styles from "./Modals.module.css";


// todo

///import entity types
// parse the fields of the prototype
// can we make some fields long, like description, and make inventory a list of objects?


function EditModal({data, cancelCallback, mode = 'add', editCallback, addCallback}) {
  const [name, setName] = useState("");
  const [shortname, setShortname] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState("");

  const confirm = () => {
    if (name?.length <= 0) {
      return;
    }

    const entity = {
      type: "character",
      name: name,
      shortname: shortname,
      enabled: enabled,
      description: description,
      inventory: inventory,
    };
    if (mode === 'edit') {
      editCallback(data, entity);
    } else {
      addCallback(entity);
    }
  };

  useEffect(() => {
    if (mode === 'edit') {
      setName(data.name);
      setShortname(data.shortname);
      setEnabled(data.enabled);
      setDescription(data.description);
      setInventory(data.inventory?.join(", "));
    }
  }, []);

  const generateCharacter = () => {
    setName("Test Character");
    setShortname("TC");
    setEnabled(true);
    setDescription("This is a test character");
    setInventory("");
  };

  return (
    <div className={styles.modal}>
      <label>{mode ? "Edit" : "Add"} Scene</label>
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
      {shortname}
      <label>Short Name</label>
      <br />
      <input
        type="text"
        placeholder="Short Name"
        value={shortname}
        onChange={(e) => setShortname(e.target.value)}
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
        type="text"
        placeholder="Inventory"
        value={inventory}
        onChange={(e) => setInventory(e.target.value)}
      />
      <br />
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      <label>Enabled</label>
      <br />
      <br />
      {!mode && <button onClick={generateCharacter}>Generate</button>}
      <button onClick={confirm}>Confirm</button>
      <button onClick={cancelCallback}>Cancel</button>
    </div>
  );
}

export default EditModal;
