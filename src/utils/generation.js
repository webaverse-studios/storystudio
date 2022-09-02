import axios from "axios";
import { Buffer } from "buffer";
import {
  defaultOpenAIParams,
  stable_diffusion_url,
  voice_url,
} from "../constants.js";
import { getOpenAIKey, makeId } from "./utils.js";
import { exampleLoreFiles } from "../exampleLoreFiles.js";

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

const getRandomEntity = (data, type) => {
  if (!data || !data[type] || data[type].length === 0) {
    return "";
  }

  const index = Math.floor(Math.random() * data[type].length);
  const name = data[type][index].name;
  if (type === "setting") {
    return name;
  } else if (name.startsWith('"')) {
    const si = name.indexOf('"', 1);
    const res = name.substring(0, si);
    const res2 = res.substring(1);
    return res2;
  }

  const split = name?.split(" ");
  if (split && split.length > 1) {
    return split[0];
  }
  return "";
};

export async function generate(type, data, baseData, openErrorDialog) {
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
      const newData = { ...data };
      // select a start character from the array provided by data.characters
      const header =
        exampleLoreFiles[Math.floor(Math.random() * exampleLoreFiles.length)];
      newData.header = header;
      newData.setting = data.setting[0];
      resp = await module.generateLoreFile(newData, makeGenerateFn());
      console.log("resp is", resp);
      return resp;
    case "objectComment":
      resp = await module.generateObjectComment(
        makeGenerateFn(),
        getRandomEntity(data, "object")
      );
      return resp;
    case "npcComment":
      resp = await module.generateNPCComment(
        makeGenerateFn(),
        getRandomEntity(data, "npc")
      );
      return resp;
    case "mobComment":
      resp = await module.generateMobComment(
        makeGenerateFn(),
        getRandomEntity(data, "mob")
      );
      return resp;
    case "loadingComment":
      resp = await module.generateLoadingComment(
        makeGenerateFn(),
        getRandomEntity(data, "setting")
      );
      return resp;
    case "banter":
      console.log("generating banter");
      resp = await module.generateBanter(
        makeGenerateFn(),
        getRandomEntity(data, "character")
      );
      if (!resp || resp?.length <= 0) {
        return generate("banter", data, baseData, openErrorDialog);
      }
      return { description: resp };

    case "loreExposition":
      resp = await module.generateLoreExposition(makeGenerateFn());
      if (!resp || resp?.length <= 0) {
        return generate("loreExposition", data, baseData, openErrorDialog);
      }
      return { description: resp };
    case "rpgDialogue":
      resp = await module.generateRPGDialogue(
        makeGenerateFn(),
        getRandomEntity(data, "character")
      );
      if (!resp || resp?.length <= 0) {
        return generate("rpgDialogue", data, baseData, openErrorDialog);
      }
      return { description: resp };
    case "reactions":
      console.log(module);
      resp = await module.generateReaction(
        makeGenerateFn(),
        getRandomEntity(data, "character")
      );
      if (!resp || resp?.length <= 0) {
        return generate("reactions", data, baseData, openErrorDialog);
      }
      return { description: resp };
    case "cutscenes":
      resp = await module.generateCutscenes(makeGenerateFn());
      if (!resp || resp?.length <= 0) {
        return generate("cutscenes", data, baseData, openErrorDialog);
      }
      return { description: resp };

    case "quests":
      resp = await module.generateQuest(
        makeGenerateFn(),
        getRandomEntity(data, "setting")
      );
      console.log("QUEST:", resp);
      return resp;
    default:
      openErrorDialog("Unknown type " + type);
      return null;
  }

  res.image = ""; //await generateImage(resp.name);

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
  console.log("PROMPT:", params.prompt);
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

    console.log("choices:", data.choices);
    return data.choices[0].text;
  } catch (e) {
    console.log(e);
    return "returning from error";
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
    console.log("STOP:", stop);
    return await openaiRequest(getOpenAIKey(), prompt, stop);
  };
}
