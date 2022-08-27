import { Configuration, OpenAIApi } from "openai";
import { lore } from "../constants";

function shuffleArray(array, limit = 10) {
  const shortenArray = (array) => {
      if (array.length > limit) {
          return array.slice(0, limit);
      }
      return array;
  }
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return shortenArray(array);
};


const createScenePrompt = () => `\
${lore.scene.prompt}
${shuffleArray(lore.scene.examples).join('\n')}
Location:`;

const createCharacterPrompt = () => `\
${lore.character.prompt}
${shuffleArray(lore.character.examples).join(`\n`)}
Character:`;

const createObjectPrompt = () => `\
${lore.object.prompt}
${shuffleArray(lore.object.examples).join(`\n`)}
Object:`;


let openai = new OpenAIApi(
  new Configuration({
    apiKey: localStorage.getItem("openai_key") ?? "",
  })
);

export function setOpenAIKey(newKey) {
  localStorage.setItem("openai_key", newKey);
  if (newKey.includes("-")) {
    openai = new OpenAIApi(
      new Configuration({
        apiKey: newKey,
      })
    );
  }
  //console.log('openai is', openai);
}

export function getOpenAIKey() {
  //console.log('openai is', openai);
  //console.log('openai.configuration is', openai.configuration);
  return openai.configuration.apiKey;
}

async function openaiRequest(
  prompt,
  stop,
  model = "davinci",
  top_p = 1,
  frequency_penalty = 1.5,
  presence_penalty = 1.5,
  temperature = 1,
  max_tokens = 256,
  best_off = 5
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
    best_of: best_off,
  });
  if (completion.data.choices?.length > 0) {
    return completion.data.choices[0].text;
  } else {
    return "";
  }
}

async function generateScene() {
  const scenePrompt = createScenePrompt();

  const resp = await openaiRequest(scenePrompt, [".,\n", "Location:"]);
  const lines = resp.split("\n");
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
}

async function generateCharacter() {
  const characterPrompt = createCharacterPrompt();
  //console.log('characterPrompt is', characterPrompt);
  const resp = await openaiRequest(characterPrompt, [".,\n", "Character:"]);
  const lines = resp.split("\n");
  const inventory =
    lines.length > 2 ? lines[2].replace("Inventory: ", "").trim() : "";
  return {
    name: lines[0].trim().replaceAll('"', ""),
    description: lines[1]
      .replace("Description: ", "")
      .trim()
      .replaceAll('"', ""),
    inventory: inventory,
  };
}

async function generateObject() {
  const objectPrompt = createObjectPrompt();
  const resp = await openaiRequest(objectPrompt, [".,\n", "Object:"]);
  const lines = resp.split("\n");
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
}

const generateLore = async (data, module) => {
  const _resp = [];
  //console.log('data is', data);
  //console.log('data["setting"] is', data["setting"]);
  const lorePrompt = module.makeLorePrompt({
    settings: data["setting"],
    characters: data["character"],
    messages: [],
    objects: data["object"],
    dstCharacter:
      data["character"][Math.floor(Math.random() * data["character"].length)],
  });

  //console.log('lorePrompt is', lorePrompt);

  const resp = await openaiRequest(lorePrompt, ["Input:", "Output:"]);

  const battleDialoguePrompt = "";
  // module.makeBattleIntroductionPrompt({
  //   name: data["character"][i].name,
  //   bio: data["character"][i].description,
  // });

  // const resp2 = await openaiRequest(
  //   battleDialoguePrompt,
  //   module.makeBattleIntroductionStop()
  // );

  const loreResp = module.parseLoreResponses(resp);
  //console.log('loreResp', loreResp)
  for (let i = 0; i < loreResp.length; i++) {
    // loreResp[i].rpgDialogue = resp2;
    _resp.push(loreResp[i]);
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
  console.log('generating...');
  console.log(type, data, baseData)
  // if (
  //   !baseData ||
  //   !baseData.module ||
  //   Object.entries(baseData.module).length === 0
  // ) {
  //   console.error('baseData isnull ', baseData);
  //   return null;
  // }

  const res = {
    type: type,
    name: "",
    shortname: "",
    enabled: true,
    description: "",
    inventory: [],
  };
  let resp = undefined;
  console.log('handling type', type);
  switch (type) {
    case "overview":
      console.error('not implemented');
      break;
    case "setting":
      resp = await generateScene(baseData.module);
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "character":
      resp = await generateCharacter(baseData.module);
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "object":
      resp = await generateObject(baseData.module);
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "npc":
      resp = await generateCharacter(baseData.module);
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "mob":
      resp = await generateCharacter(baseData.module);
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "dialog":
      resp = await generateLore(data, baseData.module);
      return resp;
    default:
      console.log("unknown type", type);
      return null;
  }

  // for(let i = 0; i < data[type].length;i++) {
  //   if (data[type].name === res.name) {
  //     return generate(type, data, data)
  //     //found a duplicate, so generate a new name
  //   }
  // }

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
