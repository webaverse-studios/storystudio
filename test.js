import dotenv from "dotenv";
dotenv.config();
import 'localstorage-polyfill'
global.localStorage // now has your in memory localStorage
import { openaiRequest } from "./src/utils/generation.js";
import fs from "fs";
import {
  generateSetting,
  generateCharacter,
  generateObject,
  generateLore,
  generateObjectComment,
  generateReaction,
  generateBanter,
  generateLoreExposition,
  generateRPGDialogue,
  generateCutscene,
  generateActionTask,
  generateLocationComment,
  generateSelectCharacter,
  generateChatMessage,
  generateDialogueOptions,
  generateCharacterIntroPrompt,
  generateBattleIntroduction
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
    description: `(13/M dealer. He mostly deals things that are not drugs, like information and AI seeds.): Toxins are the Devil's Food! But sometimes they can be good for you, if you know what I mean? That's a drug reference, but I wouldn't expect you to get that unless you were on drugs. By the way you want some?
      (onselect: I don't do drugs, but I know someone who does. Let me introduce you to my friend Bricks.)`,
    Inventory: [{
      name: `sword`,
      description: `A rusty old sword.`,
      metadata: `Damage: 20, Element: fire`,
    }],
  },
  {
    name: `artemis`,
    description: `(15/F pet breeder. She synthesizes pet animals by combining their neural genes.): Do you ever wonder why we keep pets on leashes? I mean they are technically AIs, so we could reprogram them to not need leashes. But someone somewhere decided that leashes were the prettier choice. Life is nice. (onselect: Bless the hearts of the birds, because they paint the sky.)`,
    Inventory: [{
      name: `pistol`,
      description: `Basic pistol.`,
    }],
  },
  {
    name: `bailey`,
    description: `(13/F black witch. She is smart, reserved, and studious, but has a dark side to her.): Listen up, if you need quality potions, I'm your ma'am, ma'am. Yes I may be a witch but that doesn't mean I'm not a lady. I'll take your money and turn it into something magical. Just don't anger me, or you'll be a tree. (onselect: Witchcraft is not a sin. It's a science.)`,
    Inventory: [{
      name: `bow`,
      description: `A basic bow. It looks like something rambo would use.`
    }]
  }],
  party: [{
    name: `scillia`,
    description: `Her nickname is Scilly or SLY. 13/F drop hunter. She is an adventurer, swordfighter and fan of potions. She is exceptionally skilled and can go Super Saiyan.`,
    Inventory: [{
      name: `sword`,
      description: `A rusty old sword.`,
      metadata: `Damage: 20, Element: fire`,
    }],
  },
  {
    name: `drake`,
    description: `His nickname is DRK. 15/M hacker. Loves guns. Likes plotting new hacks. He has the best equipment and is always ready for a fight.`,
    Inventory: [{
      name: `pistol`,
      description: `Basic pistol.`,
    }],
  },
  {
    name: `hyacinth`,
    description: `Also known as Hya. 15/F beast tamer. Influencer famous for her pets, and friend of Scillia's. She is really bad in school but the richest one in the group.`,
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

    writeData(testData.objects[0], prompt, output.value, 'object_comment');
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
    }, output.prompt, output.value, 'location_comment');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('location')) {
    promises.push(generateLocationCommentTest);
  }

  // ********** SELECT CHARACTER **********
  async function generateSelectCharacterTest() {
    const { name, description } = testData.party[1];
    const output = await generateSelectCharacter({ name, description }, makeGenerateFn());

    console.log('*********** generateSelectCharacter:')
    console.log(output);

    writeData({ name, description }, output.prompt, output.value, 'select_character');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('selectcharacter')) {
    promises.push(generateSelectCharacterTest);
  }

  // ********** LORE EXPOSITION **********

  async function generateExpositionObjectTest() {
    let { name, description, comment, prompt } = await generateLoreExposition(
      {
        name: testData.objects[0].name,
        setting: `${testData.settings[0].name}\n${testData.settings[0].description}`,
        type: 'object'
      }, makeGenerateFn());
    
    writeData({ name }, prompt, description + (comment ? ('\nQuote: '+comment) : ''), 'exposition_object');
  }

  async function generateExpositionCharacterTest() {
    let { name, description, comment, prompt } = await generateLoreExposition(
      {
        name: testData.party[0].name,
        setting: `${testData.settings[0].name}\n${testData.settings[0].description}`,
        type: 'character'
      }, makeGenerateFn());
    
    writeData({ name }, prompt, description + (comment ? ('\nQuote: '+comment) : ''), 'exposition_character');
  }

  async function generateExpositionSettingTest() {
    let { name, description, comment, prompt } = await generateLoreExposition(
      {
        name: testData.settings[0].name,
        type: 'setting'
      }, makeGenerateFn());
    
    writeData({ name }, prompt, description + (comment ? ('\nQuote: '+comment) : ''), 'exposition_setting');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('exposition')) {
    promises.push(generateExpositionObjectTest);
    promises.push(generateExpositionCharacterTest);
    promises.push(generateExpositionSettingTest);
  }

  // ********** GENERATE NEW SCENE **********

  async function generateSettingTest() {
    const { name, description, comment, prompt } = await generateSetting(makeGenerateFn());
    const formattedOutput =`Location: "${name}" ${description}\nQuote: "${comment}"`;

    console.log('*********** generateSetting:')
    console.log(formattedOutput);

    writeData('', prompt, formattedOutput, 'setting');
  }

  if (test.toLowerCase().includes('all') || (test.toLowerCase().includes('setting') && !test.toLowerCase().includes('cutscene'))) {
    promises.push(generateSettingTest);
  }

    // ********** GENERATE NEW CHARACTER **********

  async function generateCharacterTest() {
    const { name, description, prompt, comment } = await generateCharacter(makeGenerateFn());
    const formattedOutput =`Character: "${name}" ${description}\nQuote: "${comment}"`

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

    console.log('*********** generateSetting:')
    console.log(formattedOutput);

    writeData('', prompt, formattedOutput, 'object');
  }

  if (test.toLowerCase().includes('all') || (test.toLowerCase().includes('object') && !test.toLowerCase().includes('objectcomment'))) {
    promises.push(generateObjectTest);
  }

  // ********** CHARACTER SELECTION INTRO **********

  async function generateCharacterIntroPromptTest() {
    const { name, description } = testData.party[0];
    const {message, onselect, prompt} = await generateCharacterIntroPrompt({ name, description }, makeGenerateFn());

    //
    const output = `${name} (${description}): ${message}\n(onselect: ${onselect})`

    console.log('*********** generateCharacterIntroPrompt:')
    console.log(prompt);
    console.log(output);

    writeData({ name, description }, prompt, output, 'character_intro_prompt');
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('intro')) {
    promises.push(generateCharacterIntroPromptTest);
  }

    // ********** CHARACTER BATTLE INTRO **********

    async function generateBattleIntroductionTest() {
      const { name, description } = testData.party[0];
      const {value, prompt} = await generateBattleIntroduction({ name, description }, makeGenerateFn());
  
      const output = `${name}: "${value}"`
      console.log('prompt: ', prompt);
      console.log('output: ', output);
  
      writeData({ name, description }, prompt, output, 'battle_introduction');
    }
  
    if (test.toLowerCase().includes('all') || test.toLowerCase().includes('battle')) {
      promises.push(generateBattleIntroductionTest);
    }

    // ********** PARTY BANTER **********

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

  async function generateRPGDialogTest() {
    const output = await generateRPGDialogue();

    console.log('*********** generateRPGDialogue:')
    console.log(output);
  }

  if (test.toLowerCase().includes('all') || test.toLowerCase().includes('rpg')) {
    promises.push(generateRPGDialogTest);
  }
  
  // TODO: Make recursive to generate multiple until done = true or doneFactor = 1
  async function generateCutsceneTest() {
    const input = { setting: testData.settings[0], characters: testData.party, objects: testData.objects };
    let  prompt;

    const response = await generateCutscene(input, makeGenerateFn());
    // push each message in response.messages to newMessages
    prompt = response.prompt;

    const output = response.messages.map(m => {return m.character.name + ": " + m.message}).join('\n');

    writeData(input, prompt, output, 'cutscene');
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

  // promises.push(generateChatMessageTest);the 

  async function generateDialogueOptionsTest() {

    const output = await generateDialogueOptions({ messages: testData.messages, nextCharacter: testData.party[0] }, makeGenerateFn());

    console.log('*********** generateDialogueOptions:')
    console.log(output);

    writeData({ messages: testData.messages, nextCharacter: testData.party[0] }, output, 'dialogue_options');
  }

  // promises.push(generateDialogueOptionsTest);

  const results = await Promise.all(promises.map(p => p()));
  console.log('All tests complete');
};



run();