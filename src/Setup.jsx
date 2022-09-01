import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getOpenAIKey, setOpenAIKey } from "./utils/openai_utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Setup = ({ _openAIParams, _setOpenAIParams }) => {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  return (
    <div className="view">
      <br />
      <h2>Welcome to Webaverse Story Studio!</h2>
      <p>
        This is tool for creating procedural and AI-generated stories in
        collaboration with humans such as yourself.
      </p>
      <h3>Setup</h3>
      <p>
        This tool uses external machine learning services. You will need an
        OpenAI API key to get started. These are free at{" "}
        <a href="https://beta.openai.com">their website</a> -- once you have
        signed up, get your API key and paste it below:
      </p>
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Key: </span>
        <input
          className={"baseInput"}
          type={apiKeyVisible ? "input" : "password"}
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
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Model:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={_openAIParams.model}
          onChange={(e) => {
            _openAIParams.model = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
          onFocus={(e) => {
            _openAIParams.model = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Top P:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={_openAIParams.top_p}
          onChange={(e) => {
            _openAIParams.top_p = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            _openAIParams.top_p = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Frequency Penalty:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={_openAIParams.frequency_penalty}
          onChange={(e) => {
            _openAIParams.frequency_penalty = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            _openAIParams.frequency_penalty = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Presence Penalty:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={_openAIParams.presence_penalty}
          onChange={(e) => {
            _openAIParams.presence_penalty = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            _openAIParams.presence_penalty = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Temperature:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={_openAIParams.temperature}
          onChange={(e) => {
            _openAIParams.temperature = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            _openAIParams.temperature = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Max Tokens:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={_openAIParams.max_tokens}
          onChange={(e) => {
            _openAIParams.max_tokens = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            _openAIParams.max_tokens = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Best Of:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={_openAIParams.best_off}
          onChange={(e) => {
            _openAIParams.best_off = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            _openAIParams.best_off = e.target.value;
            _setOpenAIParams(_openAIParams);
          }}
        />
      </div>
      <h3>Ingredients</h3>
      <p>
        The procedural generation for the Webaverse world map is deterministic,
        like Minecraft -- given a seed and a set of assets, the same map will
        output every time. This allows Webaverse stories to be dynamic and
        nearly infinite.
      </p>
      <p>
        The heart of this is procedural ingredients. The current state of AI is
        good enough to carry a lot of the workload of worldbuilding and
        generation of new ideas, which a human game developer or writer can edit
        and run with. However, AI is not currently good enough to always
        coherently generate on the fly. The ingredients view allows a human to
        build procedural ingredients with maximum AI assistance. These
        ingredients will then be placed into the world map.
      </p>
      <h3>Output</h3>
      <p>
        Edit and manage individual lore files. These can be exported as .scn
        scenes or .md lorefiles, depending on your needs.
      </p>
    </div>
  );
};

export default Setup;
