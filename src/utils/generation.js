import axios from "axios";
import { Buffer } from "buffer";
import {
  defaultOpenAIParams,
  stable_diffusion_url,
  voice_url,
  exampleLoreFiles
} from "./constants.js";
import { makeId } from "./utils.js";
import * as defaultModule from "../../public/lore-model.js";

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

export async function makeEmpty(type, openErrorModal) {
  switch (type) {
    case "setting":
      return {
        type: type,
        name: "New Setting",
        description: "This is a description of a new setting"
      }
    case "character":
      return {
        type: type,
        name: "New Character",
        description: "This is a description of a new character",
        inventory: []
      }
    case "object":
      return {
        type: type,
        name: "New Object",
        description: "This is a description of a new object",
        inventory: []
      }
    case "npc":
      return {
        type: type,
        name: "New NPC",
        description: "This is a description of a new NPC",
        inventory: []
      }
    case "mob":
      return {
        type: type,
        name: "New mob",
        description: "This is a description of a new mob",
        inventory: []
      }
    case "objectComment":
      return {
        input: {
          target: "New Object",
        },
        output: {
          comment: "This is a comment about a new object",
        }
      }
    case "loreFiles":
      return
      `# Setting

# Characters

# Objects

# Transcript

`;
    default:
      openErrorModal("Unknown type " + type);
      return null;
  }
}

export async function makeDialogue(type, openErrorModal) {
  switch (type) {
    case "objectComment":
      return {
        input: {
          target: "New Object",
        },
        output: {
          comment: "This is a comment about a new object",
        }
      }
    case "npcComment":
      return {
        input: {
          target: "New NPC",
        },
        output: {
          comment: "This is a comment about an NPC",
        }
      }
    case "mobComment":
      return {
        input: {
          target: "New Mob",
        },
        output: {
          comment: "This is a comment about a Mob",
        }
      }
    case "loadingComment":
      return {
        input: {
          target: "New Setting",
        },
        output: {
          comment: "This is a comment about the setting that is loading",
        }
      }
    case "banter":
      return {
        input: {
          setting: "New Setting",
          characters: ["New Character"],
          npcs: ["New NPC"],
          objects: ["New Object"]
        },
        output: {
          transcript: [
            {
              speaker: "New Character",
              message: "This is a message."
            }
          ]
        }
      }

    case "exposition":
      return {
        input: {
          target: "New Object"
        },
        output: {
          comment: "This is some historical information about the object."
        }
      }
    case "rpgDialogue":
      return {
        input: {
          setting: "New Setting",
          characters: ["New Character"],
          npcs: ["New NPC"],
          objects: ["New Object"]
        },
        output: {
          transcript: [
            {
              speaker: "New NPC",
              message: "Which door do you choose? [The Red Door] [The Blue Door]"
            },
            {
              speaker: "New Character",
              message: "[The Blue Door]*"
            }
          ]
        }
      }
    case "cutscenes":
      return {
        input: {
          setting: "New Setting",
          characters: ["New Character"],
          npcs: ["New NPC"],
          objects: ["New Object"]
        },
        output: {
          transcript: [
            {
              speaker: "New NPC",
              message: "Let's do something in this cutscene."
            },
            {
              speaker: "New Character",
              message: "Yes, let's.*"
            }
          ]
        }
      }
    case "actions":
      return {
        input: {
          setting: "New Setting",
          characters: ["New Character"],
          npcs: ["New NPC"],
          objects: ["New Object"],
          messages: [{
            speaker: "New NPC",
            action: "You should pick up the object"
          }]
        },
        output: {
          speaker: "New Character",
          action: "picks up New Object"
        }
      }

    case "reactions":
      return {
        input: {
          setting: "New Setting",
          characters: ["New Character"],
          npcs: ["New NPC"],
          objects: ["New Object"],
          messages: [{
            speaker: "New NPC",
            action: "I am your father"
          }]
        },
        output: {
          transcript: {
            speaker: "New Character",
            reaction: "surprise"
          }
        }
      }
    default:
      openErrorModal("Unknown type " + type);
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

export async function generate(type, data, baseData, openErrorModal) {
  const res = {
    type: type,
    name: "",
    shortname: "",
    description: "",
    inventory: [],
    img: "",
  };
  let resp = undefined;
  const module = baseData.module || defaultModule;
  switch (type) {
    case "setting":
      console.log("baseData:", baseData);
      resp = await module.generateSetting(makeGenerateFn());
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
    case "loreFiles":
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
        getRandomEntity(data, "object"),
        makeGenerateFn(),
      );
      return resp;
    case "npcComment":
      resp = await module.generateNPCComment(
        getRandomEntity(data, "npc"),
        makeGenerateFn(),
      );
      return resp;
    case "mobComment":
      resp = await module.generateMobComment(
        getRandomEntity(data, "mob"),
        makeGenerateFn(),
      );
      return resp;
    case "loadingComment":
      resp = await module.generateLoadingComment(
        getRandomEntity(data, "setting"),
        makeGenerateFn(),
      );
      return resp;
    case "banter":
      console.log("generating banter");
      resp = await module.generateBanter(
        getRandomEntity(data, "character"),
        makeGenerateFn(),
      );
      if (!resp || resp?.length <= 0) {
        return generate("banter", data, baseData, openErrorModal);
      }
      return { description: resp };

    case "exposition":
      resp = await module.generateExposition(makeGenerateFn());
      if (!resp || resp?.length <= 0) {
        return generate("exposition", data, baseData, openErrorModal);
      }
      return { description: resp };
    case "rpgDialogue":
      resp = await module.generateRPGDialogue(
        getRandomEntity(data, "character"),
        makeGenerateFn(),
      );
      if (!resp || resp?.length <= 0) {
        return generate("rpgDialogue", data, baseData, openErrorModal);
      }
      return { description: resp };
    case "reactions":
      console.log(module);
      resp = await module.generateReaction(
        getRandomEntity(data, "character"),
        makeGenerateFn(),
      );
      if (!resp || resp?.length <= 0) {
        return generate("reactions", data, baseData, openErrorModal);
      }
      return { description: resp };
    case "cutscenes":
      resp = await module.generateCutscenes(makeGenerateFn());
      if (!resp || resp?.length <= 0) {
        return generate("cutscenes", data, baseData, openErrorModal);
      }
      return { description: resp };

    case "quests":
      resp = await module.generateAction(
        getRandomEntity(data, "setting"),
        makeGenerateFn(),
      );
      console.log("ACTION:", resp);
      return resp;
    default:
      openErrorModal("Unknown type " + type);
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
    return await openaiRequest(localStorage.getItem("openai_key"), prompt, stop);
  };
}
