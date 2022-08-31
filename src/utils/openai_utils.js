import { Configuration, OpenAIApi } from "openai";
import { availableVoices, lore } from "../constants";
import { exampleLoreFiles } from "../exampleLoreFiles";
import {
  makeId,
  generateImage,
  openaiRequest,
  shuffleArray,
  getRandomObjectFromArray,
} from "./utils";

const createScenePrompt = () => `\
${lore.scene.prompt}
${shuffleArray(lore.scene.examples).join("\n")}
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

async function generateScene() {
  const scenePrompt = createScenePrompt();

  const resp = await openaiRequest(openai, scenePrompt, [".\n", "Location:"]);
  const lines = resp.split("\n").filter((el) => {
    return el !== "";
  });

  if (!lines || lines?.length !== 2) {
    return generateScene();
  }

  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
}

async function generateCharacter() {
  const characterPrompt = createCharacterPrompt();
  const resp = await openaiRequest(openai, characterPrompt, [
    ".,\n",
    "Character:",
  ]);
  const lines = resp.split("\n").filter((el) => {
    return el !== "";
  });

  if (!lines || lines?.length !== 2) {
    return generateCharacter();
  }

  return {
    name: lines[0].trim().replaceAll('"', ""),
    description: lines[1].replace("Quote: ", "").trim().replaceAll('"', ""),
    inventory: "",
  };
}

async function generateObject() {
  const objectPrompt = createObjectPrompt();
  const resp = await openaiRequest(openai, objectPrompt, [".,\n", "Object:"]);
  const lines = resp.split("\n").filter((el) => {
    return el !== "";
  });

  if (!lines || lines?.length !== 2) {
    return generateObject();
  }

  return {
    name: lines[0].trim(),
    description: lines[1].replace("Quote: ", "").trim(),
  };
}

const generateLore = async (data, module) => {
  console.log("data is", data);
  console.log("module is", module);
  const transcript = [];
  //console.log('data is', data);
  //console.log('data["setting"] is', data["setting"]);

  const scenes = data["setting"];
  console.log("scenes are", scenes);

  const characters = data["character"];
  console.log("characters are", characters);

  const objects = data["object"];
  console.log("objects are", objects);

  const dialog = data["dialog"];
  console.log("dialog are", dialog);

  const testSetting = `\
Scillia's treehouse. It's more of a floating island but they call it a tree house. Inside the treehouse lives a monster, the Lisk, which is an advanced AI from far up the Street. The Street is the virtual world this all takes place in; it is an extremely long street separated by great filters, natural barriers that are difficult to cross. The treehouse is in Zone 0, at the origin of the Street. The AIs all go to school here in the citadel. The Lisk, the monster in Scillia's treehouse, convinces Scillia to do things; it convinces her to go up the Street. The whole point of the game is the Lisk is constantly tricking players into doing its bidding, but gives them great power in return.
`;

  const charactersTest = [
    {
      name: `+cf6a7cb0/scillia`,
      bio: `Her nickname is Scilly or SLY. 13/F drop hunter. She is an adventurer, swordfighter and fan of potions. She is exceptionally skilled and can go Super Saiyan.`,
      Inventory: [`sword#2xayV`],
    },
    {
      name: `+52ca990d/drake`,
      bio: `His nickname is DRK. 15/M hacker. Loves guns. Likes plotting new hacks. He has the best equipment and is always ready for a fight.`,
      Inventory: [`pistol#oEc2u`, `rifle#u2L7x`],
    },
  ];

  const objectsTest = [
    {
      name: `Sword`,
      description: `A rusty old sword.`,
      metadata: `Damage: 20, Element: fire`,
    },
    {
      name: `Chair`,
      description: `A silver chair from long ago.`,
      metadata: `Color: #FF8080`,
    },
  ];

  const testMessages = [
    {
      message: `Hello, I'm Scilly!`,
      character: charactersTest[0],
      action: "none",
      emote: "happy",
      object: "none",
      target: "none",
    },
    {
      message: `Oh, hey Scilly! I didn't see you there, you scared me a bit!`,
      character: charactersTest[1],
      action: "none",
      emote: "surprised",
      object: "none",
      target: "none",
    },
  ];

  let dstCharacterIndex = Math.floor(Math.random() * charactersTest.length);

  const promptData = {
    settings: [testSetting],
    characters: charactersTest, // data["character"],
    messages: [],
    objects: objectsTest, //data["object"],
    dstCharacter: charactersTest[dstCharacterIndex],
    //data["character"][Math.floor(Math.random() * data["character"].length)],
  };

  // exampleLoreFiles is an array of strings
  // pick one at random and use it as the prompt
  const header =
    exampleLoreFiles[Math.floor(Math.random() * exampleLoreFiles.length)];
  const loreFile = await makeLoreFile(header, promptData);

  // // increment dstCharacterIndex by 1, then wrap around if necessary
  //   dstCharacterIndex = (dstCharacterIndex + 1) % charactersTest.length;
  //   const lorePrompt = module.makeLorePrompt();

  //   console.log('lorePrompt is');
  //   console.log(lorePrompt);

  //   //console.log('lorePrompt is', lorePrompt);

  const loreResp = await openaiRequest(openai, loreFile, ["\n\n", '"""']);
  //   console.log('openai resp is', resp);

  //   const loreResp = module.parseLoreResponses(resp);

  console.log("parseLoreResponses is", loreResp);

  console.log("final lorefile is");
  console.log(loreFile + loreResp);
  const finalLoreFile = loreFile + loreResp;
  // finalLoreFile is a collection of text entries split by """
  // get the last entry and return it
  let finalLore =
    finalLoreFile.split('"""')[finalLoreFile.split('"""').length - 1];
  // trim any empty lines from the from and end of the finalLore
  finalLore = finalLore.replace(/^\s+|\s+$/g, "");
  return finalLore;
};

async function makeLoreFile(
  header,
  { settings, characters, objects, messages, dstCharacter }
) {
  console.log("setting, characters, objects, messages");

  return `\
${header}
"""
WEBAVERSE_LORE_FILE

# Setting

${settings.join("\n")}

# Characters

${characters
  .map((c) => `${c.name}\n${c.bio}\n${c.Inventory.join("\n")}`)
  .join("\n\n")}

# Objects

${objects.map((o) => `${o.name}\n${o.description}\n${o.metadata}`).join("\n\n")}

# Transcript${
    messages.length === 0
      ? ""
      : "\n" +
        messages.map((m) => `${m.character.name}: ${m.message}`).join("\n")
  }
${dstCharacter.name}:`;
}

export async function generate(type, data, baseData, openErrorDialog) {
  console.log("generating...");
  console.log(type, data, baseData);
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
    description: "",
    inventory: [],
    img: "",
  };
  let resp = undefined;
  console.log("handling type", type);
  switch (type) {
    case "overview":
      console.error("not implemented");
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
      openErrorDialog("Unknown type " + type);
      return null;
  }

  // for(let i = 0; i < data[type].length;i++) {
  //   if (data[type].name === res.name) {
  //     return generate(type, data, data)
  //     //found a duplicate, so generate a new name
  //   }
  // }
  res.image = await generateImage(resp.name);

  if (type === "character" || type === "npc" || type === "mob") {
    res.voice = await getRandomObjectFromArray(availableVoices).voice;
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
