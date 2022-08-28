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
  console.log('data is', data)
  console.log('module is', module);
  const transcript = [];
  //console.log('data is', data);
  //console.log('data["setting"] is', data["setting"]);


  const scenes = data["setting"];
  console.log('scenes are', scenes);

  const characters = data["character"];
  console.log('characters are', characters);

  const objects = data["object"];
  console.log('objects are', objects);

  const dialog = data["dialog"];
  console.log('dialog are', dialog);

  const testSetting = `\
Scillia's treehouse. It's more of a floating island but they call it a tree house. Inside the treehouse lives a monster, the Lisk, which is an advanced AI from far up the Street. The Street is the virtual world this all takes place in; it is an extremely long street separated by great filters, natural barriers that are difficult to cross. The treehouse is in Zone 0, at the origin of the Street. The AIs all go to school here in the citadel. The Lisk, the monster in Scillia's treehouse, convinces Scillia to do things; it convinces her to go up the Street. The whole point of the game is the Lisk is constantly tricking players into doing its bidding, but gives them great power in return.
`

  const charactersTest = [
    {
      name: `scillia`,
      bio: `Her nickname is Scilly or SLY. 13/F drop hunter. She is an adventurer, swordfighter and fan of potions. She is exceptionally skilled and can go Super Saiyan.`,
      Inventory: [`sword#2xayV`]
    },
    {
      name: `drake`,
      bio: `His nickname is DRK. 15/M hacker. Loves guns. Likes plotting new hacks. He has the best equipment and is always ready for a fight.`,
      Inventory: [`pistol#oEc2u`, `rifle#u2L7x`]
    },
  ]

  const objectsTest = [{
    name: `Sword`,
    description: `A rusty old sword.`,
    metadata: `Damage: 20, Element: fire`
  },
  {
    name: `Chair`,
    description: `A silver chair from long ago.`,
    metadata: `Color: #FF8080`
  }];

  const testMessages = [
    {
      message: `Hello, I'm Scilly!`,
      character: charactersTest[0],
      action: 'none',
      emote: 'happy',
      object: 'none',
      target: 'none'
    },
    {
      message: `Oh, hey Scilly! I didn't see you there, you scared me a bit!`,
      character: charactersTest[1],
      action: 'none',
      emote: 'surprised',
      object: 'none',
      target: 'none'
    }];

  // [`scillia#ppyXa: Hey Drake, can I ask you something? /character scillia#ppyXa moves to drake#vvGyW drake#vvGyW: Sure, what is it? scillia#ppyXa: Do you ever wonder why we're here? drake#vvGyW: Is that a way to tee up a convo about pumas tomorrow? /character scillia#ppyXa emotes joy scillia#ppyXa: It might not be! drake#vvGyW: Scillia, I'm tending to serious business. The org needs me to break through this firewall by tonight. Leave me alone. /drake moves to computer#Ki3bK /character scillia#ppyXa picks up sword#T53DH /character scillia#ppyXa moves to drake#Ki3bK scillia#ppyXa: Well I wanna fight! drake#vvGyW: Not now, Scillia! /character scillia#ppyXa moves to computer#Ki3bK scillia#ppyXa: Don't make me destroy your computer to get your attention! /character drake#vvGyW emotes angry drake#vvGyW: I've got my pistol and my rifle. You wouldn't try it. scillia#ppyXa: I disagree. /character scillia#ppyXa attacks computer#Ki3bK`]

  const newMessages = []
  const transcriptCount = 5;
  const dstCharacterIndex = Math.floor(Math.random() * charactersTest.length)
  for (let i = 0; i < transcriptCount; i++) {
    const lorePrompt = module.makeLorePrompt({
      settings: [testSetting],
      characters: charactersTest, // data["character"],
      messages: [...testMessages, ...newMessages],
      objects: objectsTest, //data["object"],
      dstCharacter: charactersTest[dstCharacterIndex],
      //data["character"][Math.floor(Math.random() * data["character"].length)],
    });


    console.log('lorePrompt is');
    console.log(lorePrompt);

    //console.log('lorePrompt is', lorePrompt);

    const resp = await openaiRequest(lorePrompt, ["Input:", "Output:"]);
    console.log('openai resp is', resp);


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

    console.log('parseLoreResponses is', loreResp);
    //console.log('loreResp', loreResp)
    for (let i = 0; i < loreResp.length; i++) {
      // loreResp[i].rpgDialogue = resp2;
      transcript.push(loreResp[i]);
      newMessages.push(loreResp[i]);
    }
    console.log('transcript is', transcript);
    console.log('newMessages is', newMessages);

  }

  const loreFile = makeLoreFile({
    setting: testSetting,
    characters: charactersTest,
    objects: objectsTest,
    transcript: transcript,
  });

  console.log('final lorefile is')
  console.log(loreFile);
  return loreFile;
};

function makeLoreFile({ setting, characters, objects, transcript }) {
  return `\
WEBAVERSE_LORE_FILE

# Setting

${setting}

# Characters

${characters}

# Objects

${objects}

# Transcript

${transcript}
  `
}

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
    case "lore":
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
