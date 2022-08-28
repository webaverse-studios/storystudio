import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getOpenAIKey, setOpenAIKey } from "./utils/openai_utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const GettingStarted = ({ data, setData }) => {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  return (
    <div className="view">
    <h3>Welcome to Webaverse Story Studio!</h3>
    <p>This is tool for creating procedural and AI-generated stories in collaboration with humans such as yourself.</p>
    <h3>Setup</h3>
    <p>This tool uses external machine learning services. You will need an OpenAI API key to get started. These are free at <a href="https://beta.openai.com">their website</a> -- once you have signed up, get your API key and paste it below:</p>
    <div className={"openai"}>
    <span className={"baseLabel"}>OpenAI Key: </span>
    <input
      className={"baseInput"}
      type={"input"}
      defaultValue={getOpenAIKey()}
      onChange={(e) =>
        console.log("change", e.target.value) ||
        setOpenAIKey(e.target.value)
      }
      onFocus={(e) => setOpenAIKey(e.target.value)}
    />
    <button
      className="entityVisibility"
      value={apiKeyVisible}
      onClick={(e) => setApiKeyVisible(!apiKeyVisible)}
    >
      {apiKeyVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </button>
  </div>
    <h3>Ingredients</h3>
    <p>The procedural generation for the Webaverse world map is deterministic, like Minecraft -- given a seed and a set of assets, the same map will output every time. This allows Webaverse stories to be dynamic and nearly infinite.</p>
    <p>The heart of this is procedural ingredients. The current state of AI is good enough to carry a lot of the workload of worldbuilding and generation of new ideas, which a human game developer or writer can edit and run with. However, AI is not currently good enough to always coherently generate on the fly. The ingredients view allows a human to build procedural ingredients with maximum AI assistance. These ingredients will then be placed into the world map.</p>
    <h3>Output</h3>
    <p>Edit and manage individual lore files. These can be exported as .scn scenes or .md lorefiles, depending on your needs.</p>
    </div>
  );
};

export default GettingStarted;
