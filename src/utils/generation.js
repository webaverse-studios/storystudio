import axios from "axios";
import { Buffer } from "buffer";
import {
  defaultOpenAIParams,
  stable_diffusion_url,
  voice_url
} from "../constants";
import { getOpenAIKey, makeId } from "./utils.js";
import { exampleLoreFiles } from "../exampleLoreFiles";

export const generateImage = async (text) => {
  const resp = await axios.get(stable_diffusion_url, {
    params: {
      s: text,
    },
    responseType: "arraybuffer",
  });
  const base64String = Buffer.from(resp.data, "binary").toString("base64");
  return base64String;
};

export const generateVoice = async (character, text) => {
  const resp = await axios.get(voice_url, {
    params: {
      voice: character,
      s: text,
    },
    responseType: "blob",
  });
  return resp.data;
};

export async function generate(
  type,
  data,
  baseData,
  openErrorDialog
) {
  const res = {
    type: type,
    name: "",
    shortname: "",
    description: "",
    inventory: [],
    img: "",
  };
  let resp = undefined;
  const module = baseData.module;
  switch (type) {
    case "setting":
      console.log("baseData:", baseData);
      resp = await module.generateScene(makeGenerateFn());
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "character":
      resp = await module.generateCharacter(makeGenerateFn());
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "object":
      resp = await module.generateObject(makeGenerateFn());
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "npc":
      resp = await module.generateCharacter(makeGenerateFn());
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "mob":
      resp = await module.generateCharacter(makeGenerateFn());
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "lore":
    const newData = {...data};
      // select a start character from the array provided by data.characters
      const header = exampleLoreFiles[Math.floor(Math.random() * exampleLoreFiles.length)];
      newData.header = header;
      newData.setting = data.setting[0];
      resp = await module.generateLoreFile(newData, makeGenerateFn());
      console.log('resp is', resp);
      return resp;
    default:
      openErrorDialog("Unknown type " + type);
      return null;
  }

  res.image = await generateImage(resp.name);

  if (res.name?.length > 0) {
    res.id = makeId(5);
    res.shortname =
      res.name.replace(" ", "").trim().toLowerCase().substring(0, 7) +
      "#" +
      res.id;
  }

  if (res.description?.endsWith(",")) {
    res.description = res.description.slice(0, -1);
  }

  return res;
}

export async function query(openai_api_key, params = {}) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(openai_api_key),
    },
    body: JSON.stringify(params),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    const data = await response.json();
    if (!data.choices || data.choices?.length <= 0) {
      return "";
    }

    return data.choices[0].text;
  } catch (e) {
    console.log(e);
    return "";
  }
}

export async function openaiRequest(key, prompt, stop) {
  if (!key || key?.length <= 0) {
    return;
  }

  const oap = localStorage.getItem("openAIParams");
  let _data = null;
  if (oap) {
    _data = JSON.parse(oap);
  } else {
    _data = defaultOpenAIParams;
  }

  const {
    model,
    top_p,
    frequency_penalty,
    presence_penalty,
    temperature,
    max_tokens,
    best_of,
  } = _data;

  return await query(key, {
    model,
    prompt,
    stop,
    top_p,
    frequency_penalty,
    presence_penalty,
    temperature,
    max_tokens,
    best_of: best_of,
  });
}

export function makeGenerateFn() {
  return async (prompt, stop) => {
    return await openaiRequest(getOpenAIKey(), prompt, stop);
  }
}