import { Configuration, OpenAIApi } from "openai";
import { lore } from "../constants.js";
import { exampleLoreFiles } from "../exampleLoreFiles.js";
import { makeId, generateImage, openaiRequest, shuffleArray } from "./utils.js";

export let inspirations = [
  "Final Fantasy",
  "Sonic",
  "Calvin and Hobbes",
  "The Matrix",
  "Snow Crash",
  "Pokemon",
  "VRChat",
  "Fortnite",
  "One Piece",
  "Attack on Titan",
  "SMG4",
  "Death Note",
  "Zelda",
  "Infinity Train",
  "Dance Dance Revolution",
];

export let availableReactions = [
  "surprise",
  "victory",
  "alert",
  "angry",
  "embarrassed",
  "headNod",
  "headShake",
  "sad",
];

export let availableActions = [
  "attack",
  "defend",
  "move to",
  "follow",
  "pick up",
  "drop",
  "stop",
  "none",
];

export const generateLore = async (
  data,
  module,
  openaiConfig,
  downloadFileHandler
) => {
  // const { settings, characters, objects, messages, dstCharacter } = data;

  // first decide what the scene is about
  // get a setting from the array provided by data.settings
  console.log(data);
  const setting = data.setting[Math.floor(Math.random() * data.setting.length)];

  // decide on what is happening in this scene
  const encounterTypes = [
    { type: "quest", npcs: 1, mobs: 0, objects: 1, party: 2 },
    // { type: 'battle', npcs: {min: 0, max: 2}, mobs: {min: 1, max: 3}, objects: {min: 0, max: 2}, party: {min: 1, max: 4}},
    // { type: 'banter', npcs: {min: 0, max: 1}, mobs: {min: 0, max: 1}, objects: {min: 0, max: 1}, party: {min: 1, max: 4}},
    // { type: 'friend', npcs: {min: 1, max: 2}, mobs: {min: 0, max: 0}, objects: {min: 0, max: 2}, party: {min: 2, max: 4}},
    // { type: 'comment', npcs: {min: 0, max: 1}, mobs: {min: 0, max: 1}, objects: {min: 1, max: 3}, party: {min: 1, max: 4}},
    // { type: 'party', npcs: {min: 0, max: 0}, mobs: {min: 0, max: 0}, objects: {min: 0, max: 0}, party: {min: 2, max: 4}}
  ];

  // get a random encounter type
  const encounterType =
    encounterTypes[Math.floor(Math.random() * encounterTypes.length)];
  console.log("encounterType is", encounterType);

  // const numberOfMobs = Math.floor(Math.random() * (encounterType.mobs.max - encounterType.mobs.min + 1)) + encounterType.mobs.min;
  // const numberOfNpcs = Math.floor(Math.random() * (encounterType.npcs.max - encounterType.npcs.min + 1)) + encounterType.npcs.min;
  // const numberOfObjects = Math.floor(Math.random() * (encounterType.objects.max - encounterType.objects.min + 1)) + encounterType.objects.min;
  // const numberOfParty = Math.floor(Math.random() * (encounterType.party.max - encounterType.party.min + 1)) + encounterType.party.min;

  const numberOfMobs = 0;
  const numberOfNpcs = 1;
  const numberOfObjects = 1;
  const numberOfParty = 2;

  // get numberOfMobs mobs from the array provided by data.mobs
  const mobs = data.mob ? data.mob.slice(0, numberOfMobs) : [];
  console.log("mobs are", mobs);

  // get numberOfNpcs npcs from the array provided by data.npcs
  const npcs = data.npc ? data.npc.slice(0, numberOfNpcs) : [];
  console.log("npcs are", npcs);

  // get numberOfObjects objects from the array provided by data.objects
  const objects = data.object ? data.object.slice(0, numberOfObjects) : [];
  console.log("objects are", objects);

  // get numberOfParty party from the array provided by data.party
  const party = data.party ? data.party.slice(0, numberOfParty) : [];
  console.log("party is", party);

  // combine npcs and party into a single array called characters
  const characters = [...npcs, ...party];

  // select a start character from the array provided by data.characters
  const header =
    exampleLoreFiles[Math.floor(Math.random() * exampleLoreFiles.length)];

  let promptInject = "";
  if (encounterType.type === "quest") {
    promptInject = `\
The following is a chat transcript between the party characters and ${
      npcs[0].name
    }, a quest giver who is friendly to the party. The transcript should be about the party receiving a quest from ${
      npcs[0].name
    }.
${npcs[0].name} has the following inventory:
${
  npcs[0].Inventory &&
  npcs[0].Inventory.map((obj) => `${obj.name} - ${obj.description}`).join("\n")
}
`;
  }
  // TODO: include quest giver's inventory
  let prompt = `\
${header}

"""

# Transcript

axel: We're looking for Lara. You know where we can find her?
miranda: I can find anything, you just keep feeding me tokens and coffee.
zaphod: Anything you need, you just let me know.
miranda: Thanks. How do you guys know each other again? 
zaphod: Best friends. From waaay back in the day.

"""

# Transcript 

millie: Hey Eric, can I ask you something?
/action millie moves to eric
eric: Sure, what is it?
millie: Do you ever wonder why we're here?
eric: Is that a way to tee up a convo about the drop tomorrow?
/action millie emotes joy
millie: It might not be!
eric: Millie, I'm tending to serious business. The org needs me to break through this firewall by tonight. Leave me alone.
/action eric moves to computer

"""

# Story Inspiration: ${
    inspirations[Math.floor(Math.random() * inspirations.length)]
  };

# Setting
${`${setting.name}\n${setting.description}`}\

${party.length > 0 && "# Party Characters\n\n"}\
${
  party.map((c) => `Name: ${c.name}\nBio: ${c.bio}`).join("\n\n") +
  (party.length > 0 && "\n\n")
}\
${npcs.length > 0 && "# Non-player Characters\n\n"}\
${
  npcs.map((c) => `Name: ${c.name}\nBio: ${c.bio}`).join("\n\n") +
  (npcs.length > 0 && "\n\n")
}\
${objects.length > 0 && "# Nearby Objects\n\n"}\
${
  objects
    .map((c) => `Name: ${c.name}\nDescription: ${c.description}`)
    .join("\n\n") + (objects.length > 0 && "\n")
}\

# Available Actions: ${availableActions.join(", ")}

${promptInject}\

# Transcript

`;

  // generate a random int between 3 and 8
  const numberOfMessages = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
  let outMessages = [];

  for (let i = 0; i < numberOfMessages; i++) {
    let dstCharacterIndex = Math.floor(Math.random() * characters.length);

    let dstCharacter = characters[dstCharacterIndex];

    prompt += `${dstCharacter.name}:`;

    console.log("**************** SENDING PROMPT TO OPENAI ****************");
    console.log(prompt);
    let loreResp = await openaiRequest(getOpenAIKey(), prompt, ["\n\n", '"""']);
    // remove any newlines from the beginning or end of the response

    loreResp = loreResp
      .trim()
      .replace(/^\n+/, "")
      .replace(/\n+$/, "")
      .replaceAll('"', "")
      .replaceAll("\t", "")
      .split("\n");

    // if loreResp contains < and >, the remove them and everything between them. if contains a < or > then just remove those characters
    loreResp = loreResp
      .map((line) => {
        if (line.includes("<") && line.includes(">")) {
          return line.replace(/<[^>]*>/g, "");
        } else if (line.includes("<")) {
          return line.replace(/<[^>]*>/g, "");
        } else if (line.includes(">")) {
          return line.replace(/<[^>]*>/g, "");
        } else {
          return line;
        }
      })
      .filter((line) => line.length > 0);

    console.log(
      "**************** RECEIVED RESPONSE FROM OPENAI ****************"
    );
    console.log("loreResp is", loreResp);

    let additionalPrompt = [`${dstCharacter.name}: ` + loreResp[0] + "\n"];

    // if there are more than one lines in the response, check if they contain /action or start with any of the character's names (character[i].name)
    if (loreResp.length > 1) {
      for (let j = 1; j < loreResp.length; j++) {
        console.log("processing loreResp[j]", loreResp[j]);
        // we are going to iterate with some heuristics for a valid response
        // if the prompt is very strong, the likelihood of a good set of responses is higher
        // however, since we are doing some complex stuff, the prompt can sometimes veer off regardless,
        // especially on choosing an action

        let validResponse = false;

        // if loreResp[j] contains /action, then it might be a valid response
        if (loreResp[j].includes("/action")) validResponse = true;
        else {
          let name =
            loreResp[j].split(":").length > 1 &&
            loreResp[j].split(":").length < 3 &&
            loreResp[j].split("/").length > 1 &&
            loreResp[j].split("/")[1].split("#")[0];
          console.log("name is", name);
          if (name && name.length < 20) {
            // if loreResp[j] starts with any of the character's names, then it might be a valid response
            for (let k = 0; k < characters.length; k++) {
              // name is between the first / and the first #
              if (
                name.includes(characters[k].name) ||
                characters[k].name.includes(name)
              ) {
                validResponse = true;
              }
            }
          }
        }

        // if loreResp[j] contains a URL it is not valid
        if (loreResp[j].includes("http")) validResponse = false;

        // if it's really long, that is probably an issue
        if (loreResp[j].length > 300) validResponse = false;

        // if it isn't an action but doesn't include a ':' indicating chat, it's not valid
        if (!loreResp[j].includes("/action") && !loreResp[j].split(":")[1])
          validResponse = false;

        // if it's an empty response, invalidate it
        if (loreResp[j] === "") validResponse = false;
        if (loreResp[j].length < 18) {
          console.log("**** ERROR: loreResp[j] is too short", loreResp[j]);
          validResponse = false;
        }

        // if the first character is a '/' but the word after is not action, it's not valid
        if (loreResp[j].startsWith("/") && !loreResp[j].includes("/action"))
          validResponse = false;

        if (validResponse) {
          console.log('***adding response "', loreResp[j], '" to prompt');
          additionalPrompt.push(loreResp[j]);
        }
      }
    }
    i += additionalPrompt.length;

    outMessages = [...outMessages, ...additionalPrompt];
    prompt += "\n" + additionalPrompt.join("\n");
  }

  console.log("**************** FINAL LOREFILE ****************");

  const loreFileOutput = `\
WEBAVERSE_LORE_FILE

# Setting

${`${setting.name}\n${setting.description}\n\n`}\
${characters.length > 0 && "\n# Characters" + "\n\n"}\
${characters
  .map(
    (c) =>
      `${c.name}\n${c.bio}\n${
        c.Inventory?.length > 0 && `Inventory:\n`
      }${(c.Inventory ? c.Inventory : [])
        .map((obj) => `${obj.name}`)
        .join(", ")}`
  )
  .join("\n\n")}\
${objects.length > 0 ? "\n\n# Objects" + "\n\n" : ""}\
${objects.map((o, i) => `${o.name}\n${o.description}`).join("\n\n")}\
${
  outMessages.length === 0
    ? ""
    : "\n\n# Transcript\n\n" + outMessages.join("\n").replaceAll("\n\n", "\n")
}`;

  // split loreResp into an array of lines

  console.log(loreFileOutput);

  // check if lorefiles folder exists, if not, create it
  /*if (!fs.existsSync("lorefiles")) {
    fs.mkdirSync("lorefiles");
  }*/

  // write prompt to lorefiles/<current date>.md

  if (downloadFileHandler) {
    downloadFileHandler(loreFileOutput, "lorefile_" + Date.now() + ".md");
  }
  /*fs.writeFile(`lorefiles/${Date.now()}.md`, loreFileOutput, (err) => {
    if (err) throw err;
    console.log("file saved");
  });*/

  const legalActions = [""];

  return loreFileOutput;

  // for each line in loreResp, evaluate it
  // for (let i = 0; i < loreResp.length; i++) {

  //   // validate that all the referenced characters and objects are legal
  //   if (loreResp[i].includes('+')) {

  //   }

  //   // check if line contains /action
  //   if (loreResp[i].includes('/action')) {
  //     // check if the action is one of the legal ones

  //     // check if the
  //   }

  // // increment dstCharacterIndex by 1, then wrap around if necessary
  //   dstCharacterIndex = (dstCharacterIndex + 1) % charactersTest.length;
  //   const lorePrompt = module.makeLorePrompt();

  //   console.log('lorePrompt is');
  //   console.log(lorePrompt);

  //   //console.log('lorePrompt is', lorePrompt);

  //   console.log('openai resp is', resp);

  //   const loreResp = module.parseLoreResponses(resp);

  // console.log('parseLoreResponses is', loreResp);

  // console.log('final lorefile is')
  // console.log(loreFile+loreResp);
  // const finalLoreFile = loreFile+loreResp;
  // // finalLoreFile is a collection of text entries split by """
  // // get the last entry and return it
  // let finalLore = finalLoreFile.split("\"\"\"")[finalLoreFile.split("\"\"\"").length - 1];
  // // trim any empty lines from the from and end of the finalLore
  // finalLore = finalLore.replace(/^\s+|\s+$/g, '');
  // return finalLore;
};

const createPrompt = (type) => `\
${lore[type].prompt}
${shuffleArray(lore.scene.examples).join("\n")}
prompt:`;

export function setOpenAIKey(newKey) {
  localStorage.setItem("openai_key", newKey);
}

export function getOpenAIKey() {
  return localStorage.getItem("openai_key");
}

async function generateScene(module) {
  const scenePrompt = createPrompt("scene");
  console.log('getOpenAIKey is', getOpenAIKey());
  console.log('scenePrompt is', scenePrompt);
  console.log('module is', module);
  const resp = await openaiRequest(
    getOpenAIKey(),
    scenePrompt,
    module.makeIngredientStop()
  );
  const lines = resp.split("\n");
  console.log('lines is', lines);
  if (!lines || lines?.length !== 2) {
    console.log('!lines || lines?.length !== 2', lines);
    // return generateScene(module);
  }

  const desc = lines[1].replace("Description: ", "").trim();
  if (!desc || desc?.length <= 0) {
    console.log('!desc || desc?.length <= 0', desc);
    // return generateScene(module);
  }

  return {
    name: lines[0].trim(),
    description: desc,
  };
}

async function generateCharacter(module) {
  const characterPrompt = createPrompt("character");
  //console.log('characterPrompt is', characterPrompt);
  const resp = await openaiRequest(getOpenAIKey(), module.makeIngredientStop());
  const lines = resp.split("\n");

  if (!lines || (lines?.length < 2 && lines?.length > 3)) {
    return generateCharacter();
  }

  const desc = lines[1].replace("Quote: ", "").trim().replaceAll('"', "");
  if (!desc || desc?.length <= 0) {
    return generateCharacter();
  }

  const inventory = "";
  //lines.length > 2 ? lines[2].replace("Inventory: ", "").trim() : "";

  return {
    name: lines[0].trim().replaceAll('"', ""),
    description: desc,
    inventory: inventory,
  };
}

async function generateObject(module) {
  const objectPrompt = createPrompt("object");
  const resp = await openaiRequest(getOpenAIKey(), module.makeIngredientStop());
  const lines = resp.split("\n");
  if (!lines || lines?.length !== 2) {
    return generateObject();
  }

  const desc = lines[1].replace("Quote: ", "").trim();
  if (!desc || desc?.length <= 0) {
    return generateObject();
  }

  return {
    name: lines[0].trim(),
    description: desc,
  };
}

export async function generate(
  type,
  data,
  baseData,
  openErrorDialog,
  downloadFileHandler
) {
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
      resp = await generateLore(
        data,
        baseData.module,
        null,
        downloadFileHandler
      );
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

function thingHash(o, index) {
  function murmurhash3(key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
      k1 =
        (key.charCodeAt(i) & 0xff) |
        ((key.charCodeAt(++i) & 0xff) << 8) |
        ((key.charCodeAt(++i) & 0xff) << 16) |
        ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;

      k1 =
        ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
        0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 =
        ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
        0xffffffff;

      h1 ^= k1;
      h1 = (h1 << 13) | (h1 >>> 19);
      h1b =
        ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
      h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
    }

    k1 = 0;

    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
        k1 ^= key.charCodeAt(i) & 0xff;

        k1 =
          ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
          0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 =
          ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
          0xffffffff;
        h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 =
      ((h1 & 0xffff) * 0x85ebca6b +
        ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) &
      0xffffffff;
    h1 ^= h1 >>> 13;
    h1 =
      ((h1 & 0xffff) * 0xc2b2ae35 +
        ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) &
      0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
  }
  return `${murmurhash3(o.name).toString(16)}/${o.name}#${index + 1}`;
}
