import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: localStorage.getItem("openai_key") ?? "",
});
const openai = new OpenAIApi(configuration);

export function setOpenAIKey(newKey) {
  localStorage.setItem("openai_key", newKey);
  configuration.apiKey = newKey;
}

export function getOpenAIKey() {
  return configuration.apiKey;
}

async function openaiRequest(
  prompt,
  stop,
  model = "davinci",
  top_p = 1,
  frequency_penalty = 0.8,
  presence_penalty = 0.8,
  temperature = 0.8,
  max_tokens = 128
) {
  const completion = await openai.createCompletion({
    model: model,
    prompt: prompt,
    stop: stop,
    top_p: top_p,
    frequency_penalty: frequency_penalty,
    presence_penalty: presence_penalty,
    temperature: temperature,
    max_tokens: max_tokens,
  });
  console.log(completion);
  if (completion.data.choices?.length > 0) {
    return completion.data.choices[0].text;
  } else {
    return "";
  }
}

async function generateScene(funcs) {
  const scenePrompt = funcs.createScenePrompt();

  const resp = await openaiRequest(scenePrompt, [".,\n", "Location:"]);
  const lines = resp.split("\n");
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
}

async function generateCharacter(funcs) {
  const characterPrompt = funcs.createCharacterPrompt();

  const resp = await openaiRequest(characterPrompt, [".,\n", "Character:"]);
  const lines = resp.split("\n");
  const inventory =
    lines.length > 2 ? lines[2].replace("Inventory: ", "").trim() : "";
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
    inventory: inventory,
  };
}

async function generateObject(funcs) {
  const objectPrompt = funcs.createObjectPrompt;

  const resp = await openaiRequest(objectPrompt, [".,\n", "Object:"]);
  const lines = resp.split("\n");
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
}

const generateLore = async (data, funcs) => {
  const _resp = [];
  for (let i = 0; i < data["character"].length; i++) {
    const lorePrompt = funcs.makeLorePrompt({
      settings: [],
      characters: data["character"],
      messages: [],
      objects: data["object"],
      dstCharacter: data["character"][i],
    });

    const resp = await openaiRequest(
      lorePrompt,
      ["Input:", "Output:"],
      "davinci",
      1,
      1,
      1,
      1,
      256
    );

    const battleDialoguePrompt = funcs.makeBattleIntroductionPrompt({
      name: data["character"][i].name,
      bio: data["character"][i].description,
    });

    const resp2 = await openaiRequest(
      battleDialoguePrompt,
      funcs.makeBattleIntroductionStop()
    );

    const loreResp = funcs.parseLoreResponses(resp);
    for (let i = 0; i < loreResp.length; i++) {
      loreResp[i].rpgDialogue = resp2;
      _resp.push(loreResp[i]);
    }
  }

  return _resp;
};

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function generate(type, data, baseData) {
  if (
    !baseData ||
    !baseData.funcs ||
    Object.entries(baseData.funcs).length === 0
  ) {
    console.log("empty base data");
    return null;
  }

  const res = {
    type: type,
    name: "",
    shortname: "",
    enabled: true,
    description: "",
    inventory: [],
  };
  let resp = undefined;
  switch (type) {
    case "scene":
      resp = await generateScene(baseData.funcs);
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "character":
      resp = await generateCharacter(baseData.funcs);
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "object":
      resp = await generateObject(baseData.funcs);
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "npc":
      resp = await generateCharacter(baseData.funcs);
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "mob":
      resp = await generateCharacter(baseData.funcs);
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "data":
      resp = await generateLore(data, baseData.funcs);
      return resp;
    default:
      return null;
  }

  if (res.name?.length > 0) {
    res.id = makeId(5);
    res.shortname =
      res.name.replace(" ", "").trim().toLowerCase().substring(0, 7) +
      "#" +
      res.id;
  }

  if (res.description.endsWith(",")) {
    res.description = res.description.slice(0, -1);
  }

  return res;
}
