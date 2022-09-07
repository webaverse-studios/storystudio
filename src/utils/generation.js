import axios from "axios";
import { Buffer } from "buffer";
import {
  defaultOpenAIParams,
  stable_diffusion_url,
  voice_url,
  exampleLoreFiles,
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
  console.log("data", data);
  if (!data || !data[type] || data[type].length === 0) {
    console.log("empty data");
    return "";
  }

  const index = Math.floor(Math.random() * data[type].length);
  const name = data[type][index].name;
  return name;
};
const getRandomEntityFull = (data, type) => {
  if (!data || !data[type] || data[type].length === 0) {
    return { name: "", description: "" };
  }

  const index = Math.floor(Math.random() * data[type].length);
  const entity = data[type][index];
  return { name: entity.name, description: entity.description };
};

export async function makeEmpty(type, openErrorModal) {
  switch (type) {
    case "location":
      return {
        type: type,
        name: "New Location",
        description: "This is a description of a new location",
      };
    case "character":
      return {
        type: type,
        name: "New Character",
        description: "This is a description of a new character",
        inventory: [],
      };
    case "object":
      return {
        type: type,
        name: "New Object",
        description: "This is a description of a new object",
        inventory: [],
      };
    case "npc":
      return {
        type: type,
        name: "New NPC",
        description: "This is a description of a new NPC",
        inventory: [],
      };
    case "mob":
      return {
        type: type,
        name: "New mob",
        description: "This is a description of a new mob",
        inventory: [],
      };
    case "objectComment":
      return {
        input: {
          target: "New Object",
        },
        output: {
          comment: "This is a comment about a new object",
        },
      };
    case "loreFiles":
      return;
      `# Location

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
          target: "Silver Sword",
        },
        output: {
          comment:
            "That's a pretty cool sword. It looks exactly one I lost a long time ago.",
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "npcComment":
      return {
        input: {
          target: "Sarah Kerrigan",
        },
        output: {
          comment:
            "She scares the crap out of me. But she's usually pretty nice.",
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "mobComment":
      return {
        input: {
          target: "Goblin",
        },
        output: {
          comment: "I could probably take on four or five goblins at once.",
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "loadingComment":
      return {
        input: {
          target: "The Safehouse",
        },
        output: {
          comment: "The Safehouse is a good place to lay low for a while.",
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "banter":
      return {
        input: {
          location: "The Safehouse",
          characters: ["Korben Dallas", "Leeloo Dallas"],
          npcs: ["Sarah Kerrigan"],
          objects: ["Silver Sword"],
        },
        output: {
          transcript: [
            {
              speaker: "Korben Dallas",
              message: "I'm going to go get some food.",
            },
            {
              speaker: "Leeloo Dallas",
              message: "I'll come with you.",
            },
            {
              speaker: "Korben Dallas",
              message: "No, you stay here. I'll be back in a few minutes.",
            },
            {
              speaker: "Sarah Kerrigan",
              message: "Can I come?",
            },
            {
              speaker: "Korben Dallas",
              message: "No, you should stay with Leeloo.",
            },
          ],
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "exposition":
      return {
        input: {
          target: "Silver Sword",
        },
        output: {
          comment:
            "The Silver Sword is a legendary sword that was forged by the dwarves of the mountain range. It is said that the sword was forged from the tears of the gods themselves.",
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "rpgDialogue":
      return {
        input: {
          location: "The Safehouse",
          characters: ["Korben Dallas", "Leeloo Dallas"],
          npcs: ["Sarah Kerrigan"],
          objects: ["Silver Sword"],
        },
        output: {
          transcript: [
            {
              speaker: "Korben Dallas",
              message: "What do you want to eat? [Pizza] [Burgers] [Salad]",
            },
            {
              speaker: "Leeloo Dallas",
              message: "Pizza.",
            },
            {
              speaker: "Korben Dallas",
              message: "You got it. One pizza, coming right up.",
            },
          ],
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "cutscenes":
      return {
        input: {
          location: "The Safehouse",
          characters: ["Korben Dallas", "Leeloo Dallas"],
          npcs: ["Sarah Kerrigan"],
          objects: ["Silver Sword"],
        },
        output: {
          transcript: [
            {
              speaker: "Korben Dallas",
              message: "I've had enough, Sarah. It's time to do business.",
            },
            {
              speaker: "Sarah Kerrigan",
              message: "Yes, it is time. What business exactly?",
            },
            {
              speaker: "Korben Dallas",
              message: "You know what I'm talking about.",
            },
            {
              speaker: "Sarah Kerrigan",
              message: "I have no idea, honestly.",
            },
            {
              speaker: "Korben Dallas",
              message:
                "You abandoned our party to die. And everyone did. Even me. I wasted almost a week grinding to get back to my level.",
            },
            {
              speaker: "Sarah Kerrigan",
              message:
                "Oh, well, that's how it is. Now if you're here to challenge me, I'll gladly help you waste a few more weeks!",
            },
          ],
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "quests":
      return {
        input: {
          location: "The Safehouse",
          characters: ["New Character"],
          npcs: ["New NPC"],
        },
        output: {
          speaker: "New Character",
          action: "picks up New Object",
          reward: "100xp",
          prompt: "Prompt",
          response: "Response",
        },
      };
    case "reactions":
      return {
        input: {
          location: "New Location",
          characters: ["New Character"],
          npcs: ["New NPC"],
          messages: [
            {
              speaker: "New NPC",
              action: "I am your father",
            },
          ],
        },
        output: {
          reaction: "New reaction",
          prompt: "Prompt",
          response: "Response",
        },
      };
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
    case "location":
      console.log("baseData:", baseData);
      resp = await module.generateLocation(makeGenerateFn());
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
      newData.location = data.location[0];
      resp = await module.generateLoreFile(newData, makeGenerateFn());
      console.log("resp is", resp);
      return resp;
    case "objectComment":
      resp = await module.generateObjectComment(
        getRandomEntityFull(data, "object"),
        makeGenerateFn()
      );
      return resp;
    case "npcComment":
      resp = await module.generateNPCComment(
        getRandomEntityFull(data, "npc"),
        makeGenerateFn()
      );
      return resp;
    case "mobComment":
      resp = await module.generateMobComment(
        getRandomEntityFull(data, "mob"),
        makeGenerateFn()
      );
      return resp;
    case "loadingComment":
      resp = await module.generateLoadingComment(
        getRandomEntityFull(data, "location"),
        makeGenerateFn()
      );
      return resp;
    case "banter":
      console.log("generating banter");
      resp = await module.generateBanter(
        getRandomEntity(data, "character"),
        makeGenerateFn()
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
        makeGenerateFn()
      );
      if (!resp || resp?.length <= 0) {
        return generate("rpgDialogue", data, baseData, openErrorModal);
      }
      return { description: resp };
    case "reactions":
      console.log(module);
      resp = await module.generateReaction(
        getRandomEntity(data, "character"),
        makeGenerateFn()
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
        getRandomEntity(data, "location"),
        makeGenerateFn()
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

export function makeGenerationFn(prompt, stop) {
  return async () => {
    console.log("STOP:", stop);
    return await openaiRequest(
      localStorage.getItem("openai_key"),
      prompt,
      stop
    );
  };
}

export function makeGenerateFn() {
  return async (prompt, stop) => {
    console.log("STOP:", stop);
    return await openaiRequest(
      localStorage.getItem("openai_key"),
      prompt,
      stop
    );
  };
}
