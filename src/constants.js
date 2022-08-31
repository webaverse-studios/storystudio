export { lore } from "../public/lore_header.js";
export { exampleLoreFiles } from "./exampleLoreFiles.js";

export const views = {
  setup: "Setup",
  base: "Base",
  ingredients: "Ingredients",
  files: "Output",
  map: "Map",
};

export const contextTypes = [
  "objectComment",
  "npcComment",
  "mobComment",
  "loadingComment",
  "banter",
  "loreExposition",
  "rpgDialogue",
  "reactions",
  "cutscenes",
  "quests",
];

export const entityPrototypes = [
  {
    type: "setting",
    name: "My Scene",
    shortname: "setting#234",
    description: "This is a description of my setting",
    id: "234",
  },
  {
    type: "object",
    name: "My Object",
    shortname: "object#234",
    description: "This is a description of my object",
    id: "234",
  },
  {
    type: "character",
    name: "My Character",
    shortname: "character#234",
    description: "This is a description of my character",
    inventory: [],
    id: "234",
  },
  {
    type: "npc",
    name: "My NPC",
    shortname: "npc#234",
    description: "This is a description of my NPC",
    inventory: [],
    id: "234",
  },
  {
    type: "mob",
    name: "My Mob",
    shortname: "mob#234",
    description: "This is a description of my mob",
    inventory: [],
    id: "234",
  },
];

export const defaultIngredients = {
  dialog: {
    objectComment: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    npcComment: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    mobComment: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    loadingComment: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    banter: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    loreExposition: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    rpgDialogue: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    reactions: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    cutscenes: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
    quests: [
      {
        action: "none",
        emote: "normal",
        message:
          "I cannot use this electric attack as some of the targets are water type. So, I will try to fight with only my hands.",
        name: "Volt (Pokemon)",
        object: "electricball#1",
        target: "voltstadium-3.0#4",
      },
    ],
  },
  setting: [
    {
      type: "setting",
      name: "My Scene",
      shortname: "setting#234",
      description: "This is a description of my setting",
      inventory: [],
      id: "234",
    },
  ],
  object: [
    {
      type: "object",
      name: "My Object",
      shortname: "object#234",
      description: "This is a description of my object",
      id: "234",
    },
  ],
  character: [
    {
      type: "character",
      name: "My Character",
      shortname: "character#234",
      description: "This is a description of my character",
      inventory: [],
      id: "234",
    },
  ],
  mob: [
    {
      type: "mob",
      name: "My Mob",
      shortname: "mob#234",
      description: "This is a description of my mob",
      inventory: [],
      id: "234",
    },
  ],
  npc: [
    {
      type: "npc",
      name: "My NPC",
      shortname: "npc#234",
      description: "This is a description of my NPC",
      inventory: [],
      id: "234",
    },
  ],
};

export const stable_diffusion_url =
  "https://stable-diffusion.webaverse.com/image";
