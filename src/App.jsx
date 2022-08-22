import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { getScript, setup_scripts } from "./utils/script_handler";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const f = async () => {
      await setup_scripts();
      const hash = getScript("lore-model");
      if (hash !== undefined && hash) {
        console.log("running script");
        const res = await hash
          .call(null)
          .call(null, ["test"], [{ name: "test" }], [], [{ name: "test" }], "");
        console.log(res);
      } else {
        console.log("empty scripts");
      }
    };
    f();
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
