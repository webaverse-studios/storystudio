export { lore } from "../public/lore_header";

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
    voice: '',
    inventory: [],
    id: "234",
  },
  {
    type: "npc",
    name: "My NPC",
    shortname: "npc#234",
    description: "This is a description of my NPC",
    voice: '',
    inventory: [],
    id: "234",
  },
  {
    type: "mob",
    name: "My Mob",
    shortname: "mob#234",
    description: "This is a description of my mob",
    voice: '',
    inventory: [],
    id: "234",
  },
];

export { exampleLoreFiles } from "./exampleLoreFiles";

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
  "http://stable-diffusion.webaverse.com/image";

export const voice_url = "http://voice.webaverse.com/tts";

export const availableVoices = [
  { name: "Rapunzel", voice: "1cKtPBGZ9YiD6PkyXxUiMSTbrYhQuqnWU" },
  { name: "Cassandra", voice: "1wrUj76ngpAqBzD3-bel5C5A7vvh7DsxX" },
  { name: "Apple Bloom", voice: "1Wm-7gqws0B3j8mtSQa77Tdk3RZwHEwT5" },
  { name: "Applejack", voice: "1kpEjZ3YqMN3chKSXODOqayEm581rxj4r" },
  { name: "Big McIntosh", voice: "1UzL5vo_ykmRdbi-5JOlsQzNKkoV4tJBP" },
  { name: "Cadance", voice: "1w98tMJPfGhWvl797gImMfErPXDz_hA-6" },
  { name: "Celestia", voice: "1whXXcnXu9XPcI60xIkTEofpaDYDOw5yB" },
  { name: "Chrysalis", voice: "1bb5jKAcQcEQbx1feVwT1UmAEgocINh-E" },
  { name: "Cozy Glow", voice: "1cUQQ_4KXTXbmH3MqwwyZu77SpMr20HAL" },
  { name: "Discord", voice: "1Cg9Oc_K9UDe5WgVDAcaCSbbBoo-Npj1E" },
  { name: "Fluttershy", voice: "1KgVnjrnxZTXgjnI56ilkq5G4UJCbbwZZ" },
  { name: "Granny Smith", voice: "1FJuxLB6MhcHLtmEnOIxhN-yxJ85kmacu" },
  { name: "Luna", voice: "1_ztAbe5YArCMwyyQ_G9lUiz74ym5xJKC" },
  { name: "Maud Pie", voice: "132G6oD0HHPPn4t1H6IkYv18_F0UVLWgi" },
  { name: "Mayor Mare", voice: "1UFQWJHzKFPumoxioopPbAzM9ydznnRX3" },
  { name: "Pinkie Pie", voice: "1CdYZ2r52mtgJsFs88U0ZViMSnzpQ_HRp" },
  { name: "Rainbow Dash", voice: "1k3EMXxLC0fLvfxzGbeP6B6plgu9hqCSx" },
  { name: "Rarity", voice: "1QWBvQSso4guc1LRUD40WRJ8DY2CfqHGK" },
  { name: "Scootaloo", voice: "1YkV1VtP1w5XOx3jYYarrCKSzXCB_FLCy" },
  { name: "Shining Armor", voice: "1PUUS71w2ik0uuycNB30nXFze8C7O8OzY" },
  { name: "Spike", voice: "1TKFdmFLttjjzByj2fZW8J70ZHjR-RTwc" },
  { name: "Starlight Glimmer", voice: "1M1AMBq_xjwGTNzRUCXtSLIDJHbcSs3zR" },
  { name: "Sunset Shimmer", voice: "1x1aJt06lBvzUWRlxJ9CEKcFHxQxZPpST" },
  { name: "Sweetie Belle", voice: "1jLX0Py6j8uY93Fjf2l0HOZQYXiShfWUO" },
  { name: "Tirek", voice: "1rcPDqgDeCIHGDdvfOo-fxfA1XeM4g3CB" },
  { name: "Trixie", voice: "1a3CYt0-oTTSFjxtZvAVMpClTmQteYua5" },
  { name: "Twilight Sparkle", voice: "1QnOliOAmerMUNuo2wXoH-YoainoSjZen" },
  { name: "Zecora", voice: "1gL0hqqB7952Q1S185moQd_DRCFfIa3_g" },
];
