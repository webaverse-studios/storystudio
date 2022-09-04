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
  generateActionTask,
  generateLocationComment,
  generateSelectCharacter,
  generateChatMessage,
  generateDialogueOptions,
  generateCharacterIntroPrompt,
} from './public/lore-model.js'

const args = process.argv;
// if the first arg contains 'sk-' then it's the openai key
// otherwise it's the name of the test to run

const test = (!args[2]?.includes('sk-') && args[2]) || (!args[3]?.includes('sk-') && args[3]) || 'all';


// get openai key from process.env or args[0]
function getOpenAIKey() {
  const key = process?.env?.OPENAI_KEY || (args[2]?.includes('sk-') && args[2]) || (args[3]?.includes('sk-') && args[3]);
  if (!key || key.length <= 0) {
    return console.error("No openai key found");
  }
  return key;
}

function makeGenerateFn() {
  return async (prompt, stop) => {
    return await openaiRequest(getOpenAIKey(), prompt, stop);
  }
}

const testData = {
  settings: [{
    name: "Scillia's Treehouse",
    description: `\
It's more of a floating island but they call it a tree house. Inside the treehouse lives a monster, the Lisk, which is an advanced AI from far up the Street.`}],
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
${output}
`

    fs.writeFileSync(outputFile, write);
    console.log(`Wrote ${outputFile}`);
  }

  const promises = [];

  // ********** OBJECT COMMENT **********
  async function generateObjectCommentTest() {
    /* Logging the console. */
    console.log('Starting object comment test');
    const { name, description } = testData.objects[0];
    const output = await generateObjectComment({ name, description }, makeGenerateFn());

    console.log('*********** generateObjectComment:')
    console.log(output);

    const prompt = output.prompt;

    delete output.prompt;

    writeData(testData.objects[0], prompt, output.comment, 'object_comment');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('objectcomment')) {
    promises.push(generateObjectCommentTest);
  }

  // ********** LOCATION COMMENT **********
  async function generateLocationCommentTest() {
    const output = await generateLocationComment(
      {
        name: testData.settings[0].name,
        description: testData.settings[0].description,
        dstCharacter: testData.party[0]
      },
      makeGenerateFn());
    writeData({
      name: testData.settings[0].name,
      description: testData.settings[0].description,
      dstCharacter: testData.party[0]
    }, output.prompt, output.comment, 'location_comment');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('location')) {
    promises.push(generateLocationCommentTest);
  }

  // ********** SELECT CHARACTER **********
  async function generateSelectCharacterTest() {
    const { name, bio } = testData.party[1];
    const output = await generateSelectCharacter({ name, description: bio }, makeGenerateFn());

    console.log('*********** generateSelectCharacter:')
    console.log(output);

    writeData({ name, description: bio }, output.prompt, output.comment, 'select_character');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('selectcharacter')) {
    promises.push(generateSelectCharacterTest);
  }

  // ********** LORE EXPOSITION **********
  // test: failed

  async function generateExpositionTest() {
    console.log('Starting exposition test');
    // ****** EXPOSITION ******
    const output = await generateExposition(testData.messages[0], makeGenerateFn());

    console.log('*********** exposition:')
    console.log(output);

    writeData(testData.messages[0], output, 'exposition');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('exposition')) {
    promises.push(generateExpositionTest);
  }


  



  // ********** GENERATE NEW SCENE **********

  async function generateSceneTest() {
    const { name, description, comment, prompt } = await generateScene(makeGenerateFn());
    const formattedOutput =`Location: "${name}" ${description}\nQuote: "${comment}"`;

    console.log('*********** generateScene:')
    console.log(formattedOutput);

    writeData('', prompt, formattedOutput, 'scene');
  }

  if (test.toLowerCase().includes('all') || (test.toLowerCase().includes('scene') && !test.toLowerCase().includes('cutscene'))) {
    promises.push(generateSceneTest);
  }

    // ********** GENERATE NEW CHARACTER **********

  async function generateCharacterTest() {
    const { name, bio, prompt, comment } = await generateCharacter(makeGenerateFn());
    const formattedOutput =`Character: "${name}" ${bio}\nQuote: "${comment}"`

    console.log('*********** generateCharacter:')
    console.log(formattedOutput);

    writeData('', prompt, formattedOutput, 'character');
  }
  if (test.toLowerCase().includes('all') || (test.toLowerCase().includes('character') && !test.toLowerCase().includes('comment'))) {
    promises.push(generateCharacterTest);
  }

  // ********** GENERATE NEW OBJECT **********

  async function generateObjectTest() {
    const { name, description, comment, prompt } = await generateObject(makeGenerateFn());
    const formattedOutput =`Object: "${name}" ${description}\nQuote: "${comment}"`;

    console.log('*********** generateScene:')
    console.log(formattedOutput);

    writeData('', prompt, formattedOutput, 'object');
  }

  if (test.toLowerCase().includes('all') || (test.toLowerCase().includes('object') && !test.toLowerCase().includes('objectcomment'))) {
    promises.push(generateObjectTest);
  }











  async function generateReactionTest() {
    console.log('Starting reaction test');
    const output = await generateReaction(testData.messages[0], makeGenerateFn());

    console.log('*********** reaction:')
    console.log(output);

    const prompt = output.prompt;

    delete output.prompt;

    writeData(testData.messages[0], prompt, output.reaction, 'reaction');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('reaction')) {
    promises.push(generateReactionTest);
  }

  async function generateBanterTest() {
    console.log('Starting banter test');
    // ****** BANTER ******
    const output = await generateBanter(testData.messages[0], makeGenerateFn());

    console.log('*********** banter:')
    console.log(output);

    writeData(testData.messages[0], output, 'banter');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('banter')) {
    promises.push(generateBanterTest);
  }

  async function generateRPGDialogTest() {
    const output = await generateRPGDialogue();

    console.log('*********** generateRPGDialogue:')
    console.log(output);
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('rpg')) {
    promises.push(generateRPGDialogTest);
  }

  async function generateCutsceneTest() {

    const output = await generateCutscene();

    console.log('*********** generateCutscene:')
    console.log(output);
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('cutscene')) {
    promises.push(generateCutsceneTest);
  }

  async function generateActionTaskTest() {
    const output = await generateActionTask();

    console.log('*********** generateActionTask:')
    console.log(output);
  }

  if (
    test.toLowerCase().includes('all') ||
    (test.toLowerCase().includes('action')) &&
    !test.toLowerCase().includes('reaction')
  ) {
    promises.push(generateActionTaskTest);
  }

  // async function generateLoreTest() {

  //   const output = await generateLore(makeGenerateFn());

  //   console.log('*********** generateLore:')
  //   console.log(output);

  //   writeData('', output, 'lore');
  // }

  // promises.push(generateLoreTest);

  async function generateChatMessageTest() {
    const output = await generateChatMessage({ messages: testData.messages, nextCharacter: testData.party[0] }, makeGenerateFn());

    console.log('*********** generateChatMessage:')
    console.log(output);

    writeData({ messages: testData.messages, nextCharacter: testData.party[0] }, output, 'chat_message');
  }

  // promises.push(generateChatMessageTest);

  async function generateDialogueOptionsTest() {

    const output = await generateDialogueOptions({ messages: testData.messages, nextCharacter: testData.party[0] }, makeGenerateFn());

    console.log('*********** generateDialogueOptions:')
    console.log(output);

    writeData({ messages: testData.messages, nextCharacter: testData.party[0] }, output, 'dialogue_options');
  }

  // promises.push(generateDialogueOptionsTest);


  async function generateCharacterIntroPromptTest() {
    const output = await generateCharacterIntroPrompt({ name: testData.party[0].name, bio: testData.party[0].bio }, makeGenerateFn());

    console.log('*********** generateCharacterIntroPrompt:')
    console.log(output);

    writeData({ name: testData.party[0].name, bio: testData.party[0].bio }, output, 'character_intro_prompt');
  }

  // promises.push(generateCharacterIntroPromptTest);

  const results = await Promise.all(promises.map(p => p()));
  console.log('All tests complete');
};



run();