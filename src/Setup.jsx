import React, { useContext, useEffect, useState } from "react";
import "./styles/App.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ApplicationContext } from "./Context";

const Setup = () => {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [generateImages, setGenerateImages] = useState(false);

  const {
    setOpenAIKey,
    getOpenAIKey,
    openAIParams,
    setOpenAIParams,
    importProject,
    exportProject,
  } = useContext(ApplicationContext);

  useEffect(() => {
    const gi = localStorage.getItem("generateImages");
    if (gi) {
      setGenerateImages(gi === "true");
    }
  }, []);
  const updateGenerateImages = (value) => {
    setGenerateImages(value);
    localStorage.setItem("generateImages", !generateImages);
  };

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
          onChange={(e) => {
            setOpenAIKey(e.target.value);
          }}
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
          defaultValue={openAIParams.model}
          onChange={(e) => {
            openAIParams.model = e.target.value;
            setOpenAIParams(openAIParams);
          }}
          onFocus={(e) => {
            openAIParams.model = e.target.value;
            setOpenAIParams(openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Top P:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={openAIParams.top_p}
          onChange={(e) => {
            openAIParams.top_p = e.target.value;
            setOpenAIParams(openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            openAIParams.top_p = e.target.value;
            setOpenAIParams(openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Frequency Penalty:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={openAIParams.frequency_penalty}
          onChange={(e) => {
            openAIParams.frequency_penalty = e.target.value;
            setOpenAIParams(openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            openAIParams.frequency_penalty = e.target.value;
            setOpenAIParams(openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Presence Penalty:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={openAIParams.presence_penalty}
          onChange={(e) => {
            openAIParams.presence_penalty = e.target.value;
            setOpenAIParams(openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            openAIParams.presence_penalty = e.target.value;
            setOpenAIParams(openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Temperature:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={openAIParams.temperature}
          onChange={(e) => {
            openAIParams.temperature = e.target.value;
            setOpenAIParams(openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9-.]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            openAIParams.temperature = e.target.value;
            setOpenAIParams(openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Max Tokens:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={openAIParams.max_tokens}
          onChange={(e) => {
            openAIParams.max_tokens = e.target.value;
            setOpenAIParams(openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            openAIParams.max_tokens = e.target.value;
            setOpenAIParams(openAIParams);
          }}
        />
      </div>
      <br />
      <div className={"openai"}>
        <span className={"baseLabel"}>OpenAI Best Of:</span>
        <input
          className={"baseInput"}
          type={"input"}
          defaultValue={openAIParams.best_of}
          onChange={(e) => {
            openAIParams.best_of = e.target.value;
            setOpenAIParams(openAIParams);
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onFocus={(e) => {
            openAIParams.best_of = e.target.value;
            setOpenAIParams(openAIParams);
          }}
        />
      </div>
      <br />
      {/*<div className={"openai"}>
          <span className={"baseLabel"}>Generate Images:</span>
          <input
            className={"baseInput"}
            type="checkbox"
            defaultChecked={generateImages}
            onChange={(e) => {
              updateGenerateImages(e.target.checked);
            }}
          />
          </div>*/}
      <br />
      <button onClick={importProject}>Import Project</button>
      <button onClick={exportProject}>Export Project</button>
    </div>
  );
};

export default Setup;
