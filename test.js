import dotenv from "dotenv";
dotenv.config();
import 'localstorage-polyfill'
global.localStorage // now has your in memory localStorage
import { openaiRequest } from "./src/utils/generation.js";
import fs from "fs";
import {
  generateScene,
  generateCharacter,
  generateObject,
  generateLore,
  generateObjectComment,
  generateReaction,
  generateBanter,
  generateExposition,
  generateRPGDialogue,
  generateCutscene,
  generateQuestTask,
  generateLocationComment,
  generateSelectCharacterComment,
  generateChatMessage,
  generateDialogueOptions,
  generateCharacterIntroPrompt
} from './public/lore-model.js'

// get openai key from process.env or args[0]
function getOpenAIKey() {
  const key = process?.env?.OPENAI_KEY || process?.argv[0];
  if (!key || key.length <= 0) {
    console.log("No openai key found");
    return "";
  }
  return key;
}

function makeGenerateFn() {
  return async (prompt, stop) => {
    return await openaiRequest(getOpenAIKey(), prompt, stop);
  }
}

const testData = {
  settingName: "Scillia's Treehouse",
  settings: [`\
Scillia's treehouse. It's more of a floating island but they call it a tree house. Inside the treehouse lives a monster, the Lisk, which is an advanced AI from far up the Street. The Street is the virtual world this all takes place in; it is an extremely long street separated by great filters, natural barriers that are difficult to cross. The treehouse is in Zone 0, at the origin of the Street. The AIs all go to school here in the citadel. The Lisk, the monster in Scillia's treehouse, convinces Scillia to do things; it convinces her to go up the Street. The whole point of the game is the Lisk is constantly tricking players into doing its bidding, but gives them great power in return.
    `],
  npcs: [{
    name: `bricks`,
    bio: `(13/M dealer. He mostly deals things that are not drugs, like information and AI seeds.): Toxins are the Devil's Food! But sometimes they can be good for you, if you know what I mean? That's a drug reference, but I wouldn't expect you to get that unless you were on drugs. By the way you want some?
      (onselect: I don't do drugs, but I know someone who does. Let me introduce you to my friend Bricks.)`,
    Inventory: [{
      name: `sword`,
      description: `A rusty old sword.`,
      metadata: `Damage: 20, Element: fire`,
    }],
  },
  {
    name: `artemis`,
    bio: `(15/F pet breeder. She synthesizes pet animals by combining their neural genes.): Do you ever wonder why we keep pets on leashes? I mean they are technically AIs, so we could reprogram them to not need leashes. But someone somewhere decided that leashes were the prettier choice. Life is nice. (onselect: Bless the hearts of the birds, because they paint the sky.)`,
    Inventory: [{
      name: `pistol`,
      description: `Basic pistol.`,
    }],
  },
  {
    name: `bailey`,
    bio: `(13/F black witch. She is smart, reserved, and studious, but has a dark side to her.): Listen up, if you need quality potions, I'm your ma'am, ma'am. Yes I may be a witch but that doesn't mean I'm not a lady. I'll take your money and turn it into something magical. Just don't anger me, or you'll be a tree. (onselect: Witchcraft is not a sin. It's a science.)`,
    Inventory: [{
      name: `bow`,
      description: `A basic bow. It looks like something rambo would use.`
    }]
  }],
  party: [{
    name: `scillia`,
    bio: `Her nickname is Scilly or SLY. 13/F drop hunter. She is an adventurer, swordfighter and fan of potions. She is exceptionally skilled and can go Super Saiyan.`,
    Inventory: [{
      name: `sword`,
      description: `A rusty old sword.`,
      metadata: `Damage: 20, Element: fire`,
    }],
  },
  {
    name: `drake`,
    bio: `His nickname is DRK. 15/M hacker. Loves guns. Likes plotting new hacks. He has the best equipment and is always ready for a fight.`,
    Inventory: [{
      name: `pistol`,
      description: `Basic pistol.`,
    }],
  },
  {
    name: `hyacinth`,
    bio: `Also known as Hya. 15/F beast tamer. Influencer famous for her pets, and friend of Scillia's. She is really bad in school but the richest one in the group.`,
    Inventory: [{
      name: `bow`,
      description: `A basic bow. It looks like something rambo would use.`
    }]
  }],
  objects: [
    {
      name: `chair`,
      description: `A silver chair from long ago.`,
      metadata: `Color: #FF8080`,
    },
    {
      name: `mirror`,
      description: `A shiny new mirror. I bet my outfit looks great in it!`,
    },
    {
      name: `desk`,
      description: `A desk. Not much on it`,
    },
    {
      name: `laptop`,
      description: `A laptop. It's a Macbook Pro.`,
    }
  ],
  mobs: [{
    name: `zombie`,
    description: `Standard slow zombie. Usually travels in a horde.`
  },
  {
    name: `skeleton`,
    description: `Standard skeleton, wielding a sword and broken wooden shield.`
  },
  {
    name: `spider`,
    description: `A giant spider. Probably poisonous.`
  },
  {
    name: `liskborn`,
    description: `The Lisk says its nothing but the neighbors are starting to complain about the pests.`
  },
  {
    name: `witch`,
    description: `A witch. She is a powerful witch. Probably best not to mess with her.`
  }
  ],
  messages: []
}

const run = async () => {
  // check if test_outputs folder exists, if not create it
  const testOutputs = `./test_outputs`;
  if (!fs.existsSync(testOutputs)) {
    fs.mkdirSync(testOutputs);
  }

  function writeData(inputs, prompt, output, name) {
    const outputFile = `${testOutputs}/${name}.txt`;

    const write = `\
${inputs ? `\
******** INPUT DATA ********
${JSON.stringify(inputs, null, 2)}
` : ''}
${prompt ? `\
******** PROMPT ********
${prompt}
` : ''}

******** OUTPUT DATA ********
${JSON.stringify((output && output[0]) ?? output, null, 2)}
`

    fs.writeFileSync(outputFile, write);
    console.log(`Wrote ${outputFile}`);
  }

  const promises = [];

  async function generateObjectCommentTest() {
    console.log('Starting object comment test');
    const output = await generateObjectComment(testData.objects[0], makeGenerateFn());

    console.log('*********** generateObjectComment:')
    console.log(output);

    writeData(testData.objects[0], output, 'object_comment');
  }

  promises.push(generateObjectCommentTest);

  async function generateReactionTest() {
    console.log('Starting reaction test');
    const output = await generateReaction(testData.messages[0], makeGenerateFn());

    console.log('*********** reaction:')
    console.log(output);

    writeData(testData.messages[0], output, 'reaction');
  }

  promises.push(generateReactionTest);

  async function generateBanterTest() {
    console.log('Starting banter test');
    // ****** BANTER ******
    const output = await generateBanter(testData.messages[0], makeGenerateFn());

    console.log('*********** banter:')
    console.log(output);

    writeData(testData.messages[0], output, 'banter');
  }

  promises.push(generateBanterTest);

  async function generateExpositionTest() {
    console.log('Starting exposition test');
    // ****** EXPOSITION ******
    const output = await generateExposition(testData.messages[0], makeGenerateFn());

    console.log('*********** exposition:')
    console.log(output);

    writeData(testData.messages[0], output, 'exposition');
  }

  promises.push(generateExpositionTest);

  async function generateRPGDialogTest() {
    const output = await generateRPGDialogue();

    console.log('*********** generateRPGDialogue:')
    console.log(output);
  }

  promises.push(generateRPGDialogTest);

  async function generateCutsceneTest() {

    const output = await generateCutscene();

    console.log('*********** generateCutscene:')
    console.log(output);
  }

  promises.push(generateCutsceneTest);

  async function generateQuestTaskTest() {
    const output = await generateQuestTask();

    console.log('*********** generateQuestTask:')
    console.log(output);
  }

  promises.push(generateQuestTaskTest);

  async function generateSceneTest() {
    const output = await generateScene(makeGenerateFn());

    console.log('*********** generateScene:')
    console.log(output);

    writeData('', output, 'scene');
  }

  promises.push(generateSceneTest);

  async function generateCharacterTest() {

    const output = await generateCharacter(makeGenerateFn());

    console.log('*********** generateCharacter:')
    console.log(output);

    writeData('', output, 'character');
  }

  promises.push(generateCharacterTest);

  async function generateObjectTest() {

    const output = await generateObject(makeGenerateFn());

    console.log('*********** makeGenerateFn:')
    console.log(output);

    writeData('', output, 'object');
  }

  promises.push(generateObjectTest);

  async function generateLoreTest() {

    const output = await generateLore(makeGenerateFn());

    console.log('*********** generateLore:')
    console.log(output);

    writeData('', output, 'lore');
  }

  // promises.push(generateLoreTest);

  async function generateLocationCommentTest() {

    // generateLocationComment({name, settings, dstCharacter = null},  generateFn)
    const output = await generateLocationComment(
      {
        name: testData.settings.settingName,
        settings: testData.settings,
        dstCharacter: testData.party[0]
      },
      makeGenerateFn());

    console.log('*********** generateLocationComment:')
    console.log(output);
  }

  // promises.push(generateLocationCommentTest);

  async function generateSelectTargetCommentTest() {
    // generateSelectTargetComment({name, description}, generateFn)
    const output = await generateSelectTargetComment({ name: testData.objects[0].name, description: testData.objects[0].description }, makeGenerateFn());

    console.log('*********** generateSelectCharacterComment:')
    console.log(output);

    writeData({ name: testData.objects[0].name, description: testData.objects[0].description }, output, 'select_target_comment');
  }

  // promises.push(generateSelectTargetCommentTest);


  async function generateSelectTargetCommentTest() {
    const output = await generateSelectCharacterComment({ name: testData.party[1].name, description: testData.party[1].bio }, makeGenerateFn());

    console.log('*********** generateSelectCharacterComment:')
    console.log(output);

    writeData({ name: testData.party[1].name, description: testData.party[1].bio }, output, 'select_character_comment');
  }

  promises.push(generateSelectTargetCommentTest);

  async function generateChatMessageTest() {
    const output = await generateChatMessage({messages: testData.messages, nextCharacter: testData.party[0]}, makeGenerateFn());

    console.log('*********** generateChatMessage:')
    console.log(output);

    writeData({messages: testData.messages, nextCharacter: testData.party[0]}, output, 'chat_message');
  }

  promises.push(generateChatMessageTest);

  async function generateDialogueOptionsTest() {

    const output = await generateDialogueOptions({messages: testData.messages, nextCharacter: testData.party[0]}, makeGenerateFn());

    console.log('*********** generateDialogueOptions:')
    console.log(output);

    writeData({messages: testData.messages, nextCharacter: testData.party[0]}, output, 'dialogue_options');
  }

  promises.push(generateDialogueOptionsTest);


  async function generateCharacterIntroPromptTest() {
    const output = await generateCharacterIntroPrompt({ name: testData.party[0].name, bio: testData.party[0].bio }, makeGenerateFn());

    console.log('*********** generateCharacterIntroPrompt:')
    console.log(output);
    
    writeData({ name: testData.party[0].name, bio: testData.party[0].bio }, output, 'character_intro_prompt');
  }

  promises.push(generateCharacterIntroPromptTest);

  const results = await Promise.all(promises.map(p => p()));
  console.log('All tests complete');
};



run();