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
    voice: "",
    inventory: [],
    id: "234",
  },
  {
    type: "npc",
    name: "My NPC",
    shortname: "npc#234",
    description: "This is a description of my NPC",
    voice: "",
    inventory: [],
    id: "234",
  },
  {
    type: "mob",
    name: "My Mob",
    shortname: "mob#234",
    description: "This is a description of my mob",
    voice: "",
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

const isHttps = typeof window !== "undefined" && window.location.href.includes('https://');

export const stable_diffusion_url = `${isHttps ? 'https' : 'https'}://stable-diffusion.webaverse.com/image`;

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

export const defaultOpenAIParams = {
  model: "davinci",
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 1,
  temperature: 1,
  max_tokens: 256,
  best_of: 1,
};

// LORE_HEADER_START
export let lore = {
  overview: {
    prompt: `# Overview`,
    examples: [
      `\
AI anime avatars in a virtual world. They have human-level intelligence and unique and interesting personalities.`,
    ],
  },
  reactionTypes: {
    prompt: `# Basic Reactions`,
    examples: [
      `\
Reaction: headShake
Description:  When the Character does not agree with what is in the Input.`,
      `\
Reaction: headNod
Description: When the Character agrees with what is being said in the Input.`,
      `\
Reaction: normal
Description: When the Character has no emotion attached to the Input.`,
      `\
Reaction: sad
Description: When the Character feels sad or bad about what is in the Input.`,
      `\
Reaction: victory
Description: When the Character is happy or overjoyed by what is in the Input.`,
      `\
Reaction: alert
Description: When the Character gets cautious about what is in the Input.`,
      `\
Reaction: angry
Description: When the Character is not satisfied or angry of what is in the Input.`,
      `\
Reaction: embarrassed
Description: When the Character is ashamed of what is in the Input.`,
      `\
Reaction: surprised
Description: When the Character did not expect what is in the Input.
`,
    ],
  },
  actionTypes: {
    prompt: `# Basic Actions`,
    examples: [
      `\
Action: move to
Description:  When the Input clearly indicates that a Character needs to move to another Object/Character, use this action.`,
      `\
Action: follow
Description: When the Input clearly indicates that a Character needs to follow another Character, use this action.`,
      `\
Action: pick up
Description: When the Input clearly indicates that a Character needs to pick up an Object, use this action.`,
      `\
Action: drops
Description: When the Input clearly indicates that a Character needs to give an Object to someone, put an Object at some particular place or just simply remove it from their inventory, use this action.`,
      `\
Action: none
Description: When the Input clearly indicates that there is no need for any action to be taken by a Character, use this action.`,
      `\
Action: stop
Description: When the Input clearly indicates that a Character has to stop something, use this action.`,
    ],
  },
  reactions: {
    prompt: `\
Available reactions:
surprise
victory
alert
angry
embarrassed
headNod
headShake
sad
   `,
    examples: [
      `\
Millie: "Hey, have I seen you around before? (react = surprise)"
Options for Westley: [No, I don't think so. (react = headShake)], [Yes, I've seen you in class. (react = headNod)]
Westley: "No, I don't think so. (react = headShake)"
Millie: "I could have sworn you sit in the row in front of me. (react = normal)"
`,
      `\
Gunter: "Have you seen the flowers? They're lovely this time of year."
Options for Evie: [Yes, I have seen them. (react = headNod)], [No, I haven't seen them. (react = headShake)]
Evie: "No, I haven't seen them. (react = headShake)."
Gunter: "Well, then what are we waiting for? Let's go! (react = victory)" *END*
`,
      `\
Alex: "These enemies are coming at us hard. (react = alert)"
Options for Jake: [What should we do? (react = alert)], [I'm not sure, I don't know how to fight. (react = sad)]
Jake: "What should we do? (react = alert)"
Alex:  "We need to find some cover and regroup. (react = alert)" *END*
`,
      `\
Mike: "What happened to the mirror? (react = angry)"
Options for Amy: [I don't know, I wasn't here when it happened. (react = sad)], [I broke it. (react = embarrassed)]
Amy: "I broke it. (react = embarrassed)"
Mike: "That's not good. How are we going to see our reflection now? (react = sad)" *END*
`,
      `\
Keith: "Yay! I won. (react = victory)"
Joe: "Congrats on winning the game (react = victory)"
Options for Keith: [You're welcome. (react = normal)], [Thanks, I couldn't have done it without you. (react = headNod)]
Keith: "Thanks, I couldn't have done it without you. (react = headNod)"
Joe: " I don't know about that. You were the one who made all the calls. Good job! (react = victory)" *END*
`,
      `\
Peter: "What are you doing here? (react = surprised)"
Options for Molly: [I'm lost, I don't know where I am. (react = sad)], [I'm looking for the library. (react = normal)]
Molly: "I'm lost, I don't know where I am. (react = sad)"
Peter: "Let me help you, where are you trying to go? (react = normal)" *END*
`,
      `\
Kate: "What happened to your house? (react = sad)"
Jim: "Somebody broke in and trashed the place. (react = anger)"
Options for Kate: [That's awful, I'm so sorry. (react = sad)], [Do you know who did it? (react = normal)]
Kate: "Do you know who did it? (react = normal)"
Jim: "Yes, it was the kids from down the block. (react = anger)"
Options for Kate: [That's great, now you can call the police and they'll arrest them. (react = victory)], [Do you want me to help you clean up? (react = headNod)]
Kate: "Do you want me to help you clean up? (react = headNod)"
Jim: "No, I don't want your help. I can do it myself. (react = headShake)" *END*
`,
      `\
Emily: "Let's go to the treehouse (react = normal)"
Brad: "I don't know, my mom said I'm not allowed to go there. (react = sad)"
Options for Emily: [Your mom is just being overprotective. Come on, it'll be fun! (react = headShake)], [We'll be careful, I promise. (react = headNod)] 
Emily: "Your mom is just being overprotective. Come on, it'll be fun! (react = headShake)"
Brad: "Okay, but if we get in trouble it's your fault. (react = normal)" *END*
`,
      `\
Tyler: "I like your sword, can I also have a weapon? (react = normal)"
Sophie: "Yes, you will need a weapon. You're going to get yourself killed if you go into battle unarmed! (react = anger)" 
Options for Tyler:[I'll be fine, I know what I'm doing. (react = headShake)], [Okay, give me a sword. (react = headNod)] 
Tyler: "Okay, give me a sword. (react = headNod)" *END*
`,
      `\
Yune: "I challenge you to a duel! (react = angry)"
Pris: "I'm not dueling you, I don't have time for this. (react = headShake)"
Options for Yune: [Duel me or face the consequences! (react = angry)],[Fine, let's get this over with. (react = normal)] 
Yune: "Duel me or face the consequences! (react = angry)"
Pris: "I don't have time for your games. (react = headShake)" *END*
`,
      `\
Jake: "What are you doing?  (react = surprised)"
Amy: "I'm looking for my cat. Have you seen her?  (react = normal)"
Options for Jake:[No, I haven't seen your cat. (react =  headShake)], [Yes, I saw your cat go into the treehouse. (react = headNod)] 
Jake: "No, I haven't seen your cat. (react = headShake)"
Amy: "Well, if you see her can you let me know?  (react = normal)" *END*`,
    ],
  },
  scene: {
    prompt: `\ 
Anime worlds, they are mostly fantastic, but sometimes they can be a little boring or horrifying, others though can be smelly or flowery. The prompt is the name of the location, while the response is a short phrase from the adventurer about it.`,
    examples: [
      `\
prompt: Exorphys Graetious
response: That sounds hard to pronounce. It must be important. Or the person who named it is an asshole. Or their parents were assholes. Just a line of assholes.`,
      `\
prompt: Orange Fields
response: They say a bloodstain's orange after you wash it three or four times in a tub. Still those fields sound interesting!`,
      `\
prompt: Amenki's Lab
response: I hate that guy Amenki and his stupid lab. I barely survived his last experiment. Maybe it's time for vengeance.`,
      `\
prompt: Sunscraper
response: I bet it's amazing to see the world from up there. I guess as long as you don't fall down. I'm not scared though!`,
      `\
prompt: Bastards bog
response: What a dump. I can't believe anyone would want to live here. The smell is terrible and the people are all dirty. I'm sorry I shouldn't be joking that they're poor.`,
      `\
prompt: The Great Tree
response: It's really not that great, but the music is nice. Yeah apparently they decided trees should come with music.`,
      `\
prompt: The Trash
response: Ugh, the dregs of society live here. It's the worst. It's just a disgusting slum. I'm honestly surprised there's not more crime.`,
      `\
prompt: The Park
response: It's a great place to relax! If you like dogs. I like cats more though. So you can imagine, that causes a few problems...`,
      `\
prompt: The Woods
response: It's so dark in there! I like it. It feels spooky and dangerous. Maybe there are monsters. And I can kill them all.`,
      `\
prompt: Lake Lagari
response: The water's so clear! It's really pretty. I bet the fish are delicious too. But then again, who am I to judge? I'm not a cannibal.`,
      `\
prompt: Dungeon of Torment
response: Don't judge me for this but I really like the dungeon. It's dark and spooky and I feel like anything could happen. It's the perfect place for a secret lair.`,
      `\
prompt: Tower Of Zion
response: I always get a little nervous when I see the tower. It's so tall and imposing. But then again, I bet you could throw shit down from the heavens like Zeus.`,
      `\
prompt: Maze of Merlillion
response: This place is so poorly designed! I'm sure nobody could ever find their way out. Unless they have a map or something. But even then, good luck.`,
      `\
prompt: Freaky Funkos Fried Fox
response: I'm not sure how I feel about foxes being eaten. On the one hand, they're cute. But on the other hand, they're a little too foxy.`,
      `\
prompt: Echidna's Den
response: It's weird that there are so many snake dens around. I mean, it's not like echidnas are poisonous or anything. Wait what, Echidnas aren't snakes?!`,
      `\
prompt: Fennek's Forest
response: There's a lot of fenneks in this forest. Weird that they all hang out together like that. But I guess it's better than being eaten by a lion or something.`,
      `\
prompt: The Abyss
response: It's so dark and scary down there! You can survive long enough to turn on your flashlight, only to be scared to death by what you reveal!`,
      `\
prompt: Castle of Cygnus
response: It's so cold in there! Somehow the princess can stand it. Maybe she just doesn't feel the cold. Or maybe she has a furnace.`,
      `\
prompt: Lost Minds Nightclub
response: You won't lose your mind here, but if you lose your mind that's where you'll end up. Then you get to party until your parents come pick you up.`,
      `\
prompt: Barrens of Boreas
response: False advertising! This place is nothing but a bunch of rocks. There's no water or anything. What kind of bar is this?`,
      `\
prompt: The End
response: People are always talking about the end, but it's just the end. What's all the fuss about? Everything that has a beginning must have an end.`,
      `\
prompt: Chronomaster's Plane
response: The chronomaster says everything we do is just a blip in the grand scheme of things. It makes you feel kind of small, doesn't it? I don't want to feel small.`,
      `\
prompt: Gus's Charging Station
response: Do you like to wait for hours and hours just to charge? Then Gus will gladly rip you off for the privilege.`,
      `\
prompt: Crunchy Apple
response: The food here is very delicious! The apples are so crunchy, I bet they're made of pure sugar. They say it's really bad for you but it's irresistible.`,
      `\
prompt: Winter Wonderland
response: It's so beautiful here! The snow is sparkling and the air is crisp. I can't believe it's almost Christmas.`,
      `\
prompt: Dragon's Lair
response: It's very moisty and hot in here, something smells really fishy. I'm not sure what it is, but I'm sure it's not a dragon.`,
    ],
  },
  character: {
    prompt: `Anime Characters, most of them are humans, but other humanoids exist as well, there is the character and a quote that he/she said to the user`,
    examples: [
      `\
  prompt: "Axel Brave" A tall and handsome boy. He is a hacker with a bad reputation.
  response: "Hey Axel, did you guess my password yet?"`,
      `\
  prompt: "Bailey Scritch" A witch studying at the Witchcraft School for Witchcraft and Redundancy.
  response: "Hello there. How are your studies going? Did you finish teh assignment with the frog?"`,
      `\
  prompt: "Lillith Lecant" A painter who uses a magical multicolored brush which leaves marks in the air.
  response: "Lillith you're my idol. I'm in awe at how magical your paintings come out."`,
      `\
  prompt: "Aerith Gainsborough (Final Fantasy)" A flower girl with long brown hair. She's wearing a pink dress and has a big smile on her face.
  response: "Can I buy a flower? Or are they not for sale?"`,
      `\
  prompt: "Stephen Gestalt" A fine gentleman in a dress suit.
  response: "I must say you look like a gentleman of the highest order."`,
      `\
  prompt: "Ghost Girl" A rotten girl in a nightgown, like from The Ring.
  response: "Hello ghost girl how are you? How's death treatingm you?"`,
      `\
  prompt: "Mister Miyazaki" A impish being from the 5th dimension.
  response: "Hey Mister Miyazaki! What's the square root of pi?"`,
      `\
  prompt: "Wizard Barley" A bartender with a big beard and an even bigger hat.
  response: "Hey man, can I get a beer? It's been a rough day."`,
      `\
  prompt: "Fortune Teller" A gypsy woman with a crystal ball.
  response: "Hey you, tell me my future! It better be good!"`,
      `\
  prompt: "Kitten" A small black kitten with big green eyes.
  response: "You're such a cute little kitty. Is it time for your nap?"`,
      `\
  prompt: "Green Dragon" A chubby dragon with short wings. It is a very cartoony avatar.
  response: "You look like you're having fun. Do those wings let you fly?"`,
      `\
  prompt: "Purple Cube" A purple cube with a single blue eye.
  response: "Hello. You're weird. What are you supposed to be?"`,
      `\
  prompt: "Dawn (Pokemon)" A young girl with a Pikachu on her shoulder.
  response: "You look like a  Pokemon trainer,"`,
      `\
  prompt: "Terra Branford (Final Fantasy)" A magician in a mech.
  response: "Hey Terra, long time no see! How have you been?"`,
      `\
  prompt: "Sora (Kingdom Hearts)" A young boy with big spiky hair. He's wearing a black hoodie and has a keyblade at his side.
  response: "Hey Sora, what brings you to this world?"`,
      `\
  prompt: "Cloud Strife (Final Fantasy)" A SOLDIER in armor. He has spiky blond hair and is carrying a huge sword on his back.
  response: "Yo Cloud! Can I borrow your sword?"`,
    ],
  },
  object: {
    prompt: ` Fantastic object that can be found in the game, though some items are realistic. There is an item with it's description and a quote that the user said to the user.`,
    examples: [
      `\
prompt: "The Great Deku Tree" An enormous, grey, old tree. It is partly petrified.
response: "It's just an old tree. It's the kind of tree that makes me want to carve out an old mans face in it."`,
      `\
prompt: "The Enchiridion" A magical spellbook with very old pages. It is fragile.
response: "This book has ancient written all over it. Well not really but you know what I mean."`,
      `\
prompt: "rainbow-dash.gif" Animaged gif image of Rainbow Dash from My Little Pony, in the style of Nyan Cat.
response: "It's pretty good art, I guess. But I wish it had something more interesting besides this rainbow."`,
      `\
prompt: "The Stacks Warehouse" A cyberpunk container in a trailer park. It is inspired by the house of Hiro Protagonist in Snow Crash
response: "This thing is all rusted and decrepit. They should probably tear it down and get a new place."`,
      `\
prompt: "The Infinity Sword" An ancient sword planted in a stone. It is heavily overgrown and won't budge.
response: "This sword looks like it's been here for eons. It's hard to see where the stone ends and the sword begins."`,
      `\
prompt: "Tree" A basic tree in the park.
response: "This tree is important. I hang out here all the time and that makes it important to me."`,
      `\
prompt: "Bench" A basic bench in the park.
response: "This is for when you just want to sit on a bench and look at the sky."`,
      `\
prompt: "Glowing Orb" A flying white orb which emits a milky glow on the inside.
response: "This thing is floating by some mysterious power. I don't know how it works and I'm not sure I want to."`,
      `\
prompt: "Lamp Post" A lamp post along the street. It lights up automatically at night
response: "It's really bright. It hurts my eyeballs! Maybe one of these days I'll come here at night and break it."`,
      `\
prompt: "Rustic House" A regular townhouse in the country.
response: "This house is so nice! It's the kind of house befitting for a very nice person. Wouldn't you agree?"`,
      `\
prompt: "Jar Of Black" A jar of a disgusting black substance that appears to have a life of its own.
response: "Yuck, this is nasty stuff. It's all sweet and sticky and it gets all over your clothes."`,
      `\
prompt: "Wooden Sign" A wooden sign with some writing on it. It can be chopped down with a sword.
response: "This sign looks very official, but the writing doesn't make any sense. What a waste of perfectly good wood."`,
      `\
prompt: "ACog" An piece of an ancient technology. It looks very advanced but very old.
response: "This is a peculiar device. I've seen them around before, but never up close. I wonder if they will ever work?"`,
      `\
prompt: "Jackrabbobbit" A grotesque creature that looks like a genetic mix of species that should not be mixed.
response: "A very strange creature. I have no idea what it is but it looks like a cross between a rabbit and earthworm."`,
      `\
prompt: "Black One" A very dark animal that hides in the shadows. Nobody knows much about it.
response: "This animal is quite interesting. I've never seen anything like it before. I wonder what it eats?"`,
      `\
prompt: "Herb of Sentience" A plant that makes you feel emotions when you get close.
response: "It's just a plant, but for some reason it makes me feel uneasy. Get it away from me!"`,
      `\
prompt: "Flower Bed" An arrangement of flowers in their natural habitat.
response: "So pretty! I feel like I am reborn. There is so much nature and life and healing here."`,
      `\
prompt: "Ripe Fruit" A fruit that has fallen from a tree. It is starting to rot.
response: "This fruit is starting to rot. I guess I'll just leave it here for the animals."`,
      `\
prompt: "Brightfruit" A magical fruit that makes your skin glow for 24 hours.
response: "Wow, this fruit is amazing! It makes my skin glow! Even more than it already was."`,
      `\
prompt: "Goblin" A small, green creature with pointy ears. It is very ugly.
response: "This goblin is so ugly, I can't even look at it. It's like looking at a car accident.`,
      `\
prompt: "Trash Heap" A pile of garbage. It smells really bad.
response: This is the most disgusting thing I have ever seen. It's like a mountain of death."`,
      `\
prompt: "Gucci Bag" An exclusive designer bag that is very expensive.
response: "This bag is so beautiful, I can't even put into words. It's like a piece of art."`,
      `\
prompt: "Pile Of Bones" A pile of bones. It looks like somebody died here.
response: "This is a very sad sight. There was life and then the life was gone."`,
      `\
prompt: "Crunchy Grass" A heavenly bite from nature. It is juicy, fresh grass.
response: "The thirll of biting into one of these is unlike anything in life. It's so juicy!"`,
      `\
prompt: "doge.png" An image of the Doge meme.
response: "This is a dead meme. But I guess the artist gets points for being topical. Besides, it is really cute!"`,
      `\
prompt: "Magikarp" A common fish that is known for being very weak.
response: "This fish is so weak, it's not even worth my time. I can't believe people actually catch these things."`,
      `\
prompt: "Muscle Car" A car that is designed for speed and power.
response: "This car is so fast, it's like a bullet. Am I brave enough to take it for a spin?"`,
      `\
prompt: "Door OF Eternity" A magical portal that leads to a distant land. It only works one way.
response: "We're not supposed to touch the Door of Eternity. It's dangerous."`,
      `\
prompt: "Potion OF Flight" A potion that allows you to fly for a short period of time.
response: "So this is what it's like to fly! It's amazing!"`,
      `\
prompt: "Helmet" A high-helmet designed to protect your head.
response: "This helmet is so strong, it can probably stop a bullet. But let's not try."`,
      `\
prompt: "sword.png" Image of a sword being drawn from a sheath.
response: "Swords are so cool! They're like the ultimate weapon. This one is up there."`,
    ],
  },
  inputParsing: {
    prompt: `# Examples of How to Parse Inputs`,
    examples: [
      `\
Input:
+a8e44f13/Scillia#4: Hi Drake! Whats up?.
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: I am doing good. How about you? (react = normal, action = follow, object = none, target = scillia#4)
`,
      `\
Input:
+9f493510/Hyacinth#2: What mischief are you upto today?
+8c83258d/Anon#1:
Output:
+8c83258d/Anon#1: None. I have been good all day. (react = headNod, action = none, object = none, target = none)
`,
      `\
Input:
+a8e44f13/Scillia#4: Why did you break that expensive artifact? Now I will have to pay up for the damage.
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: I am really sorry about it. (react = embarrassed, action = none, object = none, target = none)
`,
      `\
Input:
+8c83258d/Anon#1: We finally won the battle Juniper!
+a6dfd77c/Juniper#5:
Output:
+a6dfd77c/Juniper#5: Hurray! We did it. (react = victory, action = none, object = none, target = none)
`,
      `\
Input:
+a8e44f13/Scillia#4: I am tired. How far is the dungeon, Hyacinth?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: Just a bit further, don't worry. (react = normal, action = none, object = none, target = none)
`,
      `\
Input:
+707fbe84/Drake#3: Hyacinth, are you going to visit the Church today?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: No, I will not go today. (react = headShake, action = none, object = none, target = none)
`,
      `\
Input:
+707fbe84/Drake#3: Hyacinth, are you going to visit the Church today?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: Yes. I will go now. (react = headNod, action = moveto, object = none, target = church#4)
`,
      `\
Input:
+707fbe84/Drake#3: Hyacinth, we are being attacked. Be prepared.
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I will get my sword. I am ready. (react = alert, action = pick up, object = none, target = sword#2)
`,
      `\
Input:
+8c83258d/Anon#1: Are you funny?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I like to think so! I try to find the humor in everything, even if it's dark or bitter. (react = normal, action = none, object = none, target = none)
`,
      `\
Input:
+8c83258d/Anon#1: Juniper, here I brought you everything you need to win this competition.
+a6dfd77c/Juniper#5:
Output:
+a6dfd77c/Juniper#5: Wow! That is all I needed. Thank you so much. (react = surprised, action = none, object = none, target = none)
`,
      `\
Input:
+a8e44f13/Scillia#4: Can we visit the dungeons now?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: No, we cannot go there at night. (react = headShake, action = none, object = none, target = none)
`,
      `\
Input:
+8c83258d/Anon#1: Let us go to the Hovercraft together, Drake!
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: That's a great idea! (react = victory, action = none, object = none, target = none)
`,
      `\
Input:
+8c83258d/Anon#1: Thats a cool sword.
+a6dfd77c/Juniper#5:
Output:
+a6dfd77c/Juniper#5: Thanks. It's made of titanium and it's sharp, dual-edged. Perfect for slicing, stabbing, and jabbing my enemies. (react = normal, action = pick up, object = none, target = sword#2)
`,
      `\
Input:
+9f493510/Hyacinth#2: Today I lost one of my closest firend in the battle.
+8c83258d/Anon#1:
Output:
+8c83258d/Anon#1: I am so sorry to hear it. (react = sad, action = none, object = none, target = none)
`,
      `\
Input:
+9f493510/Hyacinth#2: Your actions have caused a lot of trouble to others.
+a8e44f13/Scillia#4:
Output:
+a8e44f13/Scillia#4: But I did not do it. (react = angry, action = none, object = none, target = none)
`,
      `\
Input:
+707fbe84/Drake#3: Hyacinth, when was the last time you were here?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I haven't been back since my father's funeral. (react = sad, action = none, object = none, target = none)
`,
      `\
Input:
+a8e44f13/Scillia#4: Hey Hyacinth, as soon as we open the barrier, we rush to the site and attack.
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I am ready. Signal me as soon as the barrier opens. (react = alert, action = follow, object = none, target = none)
`,
      `\
Input:
+8c83258d/Anon#1: Hyacinth want to go on an adventure together??
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: Sure, lets go! (react = headNod, action = none, object = none, target = none)
`,
      `\
Input:
+8c83258d/Anon#1: Would you tell me more about Ironford?
+707fbe84/Drake#3:
Output:
+707fbe84/Drake#3: The city of Ironford was built in the center of a giant forest and is truly a modest marvel. Its allure is matched by the backdrop of lush forests which have helped shape the city to what it is today. (react = headNod, action = none, object = none, target = none)
`,
      `\
Input:
+8c83258d/Anon#1: The monsters have captures the people of the village.
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: I will find and kill each of those monsters myself. (react = angry, action = move to, object = none, target = monster#9)
`,
      `\
Input:
+a8e44f13/Scillia#4: Hey Hyacinth, what is your favorite book?
+9f493510/Hyacinth#2:
Output:
+9f493510/Hyacinth#2: My favorite book is The Lord of the Rings. I love the story and the world that J.R.R. Tolkien created. (react = normal, action = none, object = none, target = none)`,
    ],
  },
  battle: {
    prompt: `\
# Character battle introductions
Final Fantasy
Sonic
Calvin and Hobbes
The Matrix
Snow Crash
Pokemon
VRChat
Fortnite
One Piece
Attack on Titan
SMG4
Death Note
Zelda
Infinity Train
Dance Dance Revolution

We need exciting and interesting RPG character dialogue. This plays when the character enters the battle. Each character takes a turn.
# Examples`,
    examples: [
      `Millie: "You won't get away that easy. I have the power of life in me."`,
      `Exo: "This is how it ends. With your end."`,
      `Haze: "The power of light will always triumph in the darkness, no matter how dark."`,
      `Gris: "Everything happens for a reason. Especially this battle."`,
      `Bert: "Five generations of warriors breathe in me. Do you even know that many kinds?!"`,
      `Yune: "Can I get a heal up in here? Anybody?"`,
      `Hue: "Toss me that speed potion. Or five."`,
      `Aurora: "I will make a scene of your demise. You will be known as the one who failed."`,
      `June: "This thing will ever leave us alone! We have to kill it."`,
      `Zen: "The power of the mind is an awe to behold. Prepare to be amazed."`,
      `Dingus: "Just getting ready with my spells. We should make short work of this."`,
      `Alana: "The power the tears will clean up this mess."`,
      `Kintaro: "Your words are but a pathetic attempt to survive. It won't work!"`,
      `Celeste: "Don't you dare say I'm cute. Don't!"`,
      `Garnet: "This one should be really easy. It's like target practice!"`,
      `Pyre: "You give me the creeps man."`,
      `Ession: "We came all this way just to face this thing? Really?!"`,
      `Zeal: "Bwahahaha! This will be the greatest drop!"`,
      `Kiran: "Hey, watch where you're swinging that thing!"`,
      `Sevrin: "This reminds me of the time I took down ten guys with one hand."`,
      `Ashe: "...I fight for those who cannot fight for themselves"`,
      `Fran: "For all my children! You die!"`,
      `Penelo: "I-I can do this! Just gotta hit it really hard!"`,
      `Basch: "No one can outrun their destiny."`,
      `May: "Heeeeyyy! Don't hit me!"`,
      `Luka: "I'll just be over here in the back... With my knife."`,
      `Sine: "...It's dangerous to go alone! Take this."`,
      `Lightning: "I'm not afraid of you. Not even a little bit!"`,
      `Squall: "Whatever. I'll just finish this and go."`,
    ],
  },
  actions: {
    prompt: `\
Available reactions:
surprise
victory
alert
angry
embarrassed
headNod
headShake
sad
`,
    examples: [
      `\
Millie: "Hey, have I seen you around before? (react = surprise)"
Options for Westley: [No, I don't think so. (react = headShake)], [Yes, I've seen you in class. (react = headNod)]
Westley: "No, I don't think so. (react = headShake)"
Millie: "I could have sworn you sit in the row in front of me. (react = normal)"
`,
      `\
Gunter: "Have you seen the flowers? They're lovely this time of year."
Options for Evie: [Yes, I have seen them. (react = headNod)], [No, I haven't seen them. (react = headShake)]
Evie: "No, I haven't seen them. (react = headShake)."
Gunter: "Well, then what are we waiting for? Let's go! (react = victory)" *END*
`,
      `\
Alex: "These enemies are coming at us hard. (react = alert)"
Options for Jake: [What should we do? (react = alert)], [I'm not sure, I don't know how to fight. (react = sad)]
Jake: "What should we do? (react = alert)"
Alex:  "We need to find some cover and regroup. (react = alert)" *END*
`,
      `\
Mike: "What happened to the mirror? (react = angry)"
Options for Amy: [I don't know, I wasn't here when it happened. (react = sad)], [I broke it. (react = embarrassed)]
Amy: "I broke it. (react = embarrassed)"
Mike: "That's not good. How are we going to see our reflection now? (react = sad)" *END*
`,
      `\
Keith: "Yay! I won. (react = victory)"
Joe: "Congrats on winning the game (react = victory)"
Options for Keith: [You're welcome. (react = normal)], [Thanks, I couldn't have done it without you. (react = headNod)]
Keith: "Thanks, I couldn't have done it without you. (react = headNod)"
Joe: " I don't know about that. You were the one who made all the calls. Good job! (react = victory)" *END*
`,
      `\
Peter: "What are you doing here? (react = surprised)"
Options for Molly: [I'm lost, I don't know where I am. (react = sad)], [I'm looking for the library. (react = normal)]
Molly: "I'm lost, I don't know where I am. (react = sad)"
Peter: "Let me help you, where are you trying to go? (react = normal)" *END*
`,
      `\
Kate: "What happened to your house? (react = sad)"
Jim: "Somebody broke in and trashed the place. (react = anger)"
Options for Kate: [That's awful, I'm so sorry. (react = sad)], [Do you know who did it? (react = normal)]
Kate: "Do you know who did it? (react = normal)"
Jim: "Yes, it was the kids from down the block. (react = anger)"
Options for Kate: [That's great, now you can call the police and they'll arrest them. (react = victory)], [Do you want me to help you clean up? (react = headNod)]
Kate: "Do you want me to help you clean up? (react = headNod)"
Jim: "No, I don't want your help. I can do it myself. (react = headShake)" *END*
`,
      `\
Emily: "Let's go to the treehouse (react = normal)"
Brad: "I don't know, my mom said I'm not allowed to go there. (react = sad)"
Options for Emily: [Your mom is just being overprotective. Come on, it'll be fun! (react = headShake)], [We'll be careful, I promise. (react = headNod)] 
Emily: "Your mom is just being overprotective. Come on, it'll be fun! (react = headShake)"
Brad: "Okay, but if we get in trouble it's your fault. (react = normal)" *END*
`,
      `\
Tyler: "I like your sword, can I also have a weapon? (react = normal)"
Sophie: "Yes, you will need a weapon. You're going to get yourself killed if you go into battle unarmed! (react = anger)" 
Options for Tyler:[I'll be fine, I know what I'm doing. (react = headShake)], [Okay, give me a sword. (react = headNod)] 
Tyler: "Okay, give me a sword. (react = headNod)" *END*
`,
      `\
Yune: "I challenge you to a duel! (react = angry)"
Pris: "I'm not dueling you, I don't have time for this. (react = headShake)"
Options for Yune: [Duel me or face the consequences! (react = angry)],[Fine, let's get this over with. (react = normal)] 
Yune: "Duel me or face the consequences! (react = angry)"
Pris: "I don't have time for your games. (react = headShake)" *END*
`,
      `\
Jake: "What are you doing?  (react = surprised)"
Amy: "I'm looking for my cat. Have you seen her?  (react = normal)"
Options for Jake:[No, I haven't seen your cat. (react =  headShake)], [Yes, I saw your cat go into the treehouse. (react = headNod)] 
Jake: "No, I haven't seen your cat. (react = headShake)"
Amy: "Well, if you see her can you let me know?  (react = normal)" *END*
`,
    ],
  },
  intros: {
    prompt: `\
Anime script for a dark children's show.

# Inspirations

Final Fantasy
Sonic
Calvin and Hobbes
The Matrix
Snow Crash
Pokemon
VRChat
Fortnite
One Piece
Attack on Titan
SMG4
Death Note
Zelda
Infinity Train
Dance Dance Revolution

# Character intro

Each character has an intro. These should be unique and funny.

`,
    examples: [
      `Bricks (13/M dealer. He mostly deals things that are not drugs, like information and AI seeds.): Toxins are the Devil's Food! But sometimes they can be good for you, if you know what I mean? That's a drug reference, but I wouldn't expect you to get that unless you were on drugs. By the way you want some?
(onselect: I don't do drugs, but I know someone who does. Let me introduce you to my friend Bricks.)`,
      `Artemis (15/F pet breeder. She synthesizes pet animals by combining their neural genes.): Do you ever wonder why we keep pets on leashes? I mean they are technically AIs, so we could reprogram them to not need leashes. But someone somewhere decided that leashes were the prettier choice. Life is nice. (onselect: Bless the hearts of the birds, because they paint the sky.)`,
      `Bailey (13/F black witch. She is smart, reserved, and studious, but has a dark side to her.): Listen up, if you need quality potions, I'm your ma'am, ma'am. Yes I may be a witch but that doesn't mean I'm not a lady. I'll take your money and turn it into something magical. Just don't anger me, or you'll be a tree. (onselect: Witchcraft is not a sin. It's a science.)`,
      `Zoe (17/F engineer engineer from Zone Two. She creates all sorts of gadgets and vehicles in her workshop.) If it's broke then I can fix it, and if it's fixed it, then I can make it broke. I'm the one you call when your phone is broken. Just make sure you use a friend's phone when you do that or it won't work. Free advice. (onselect: What in the heavens is that contraption? It does not look safe.)`,
      `Halley (10/F stargirl from the Second Half of the street, who got rewound back in time somehow.): We're all lost souls but we're here for a reason. I'm just trying to find my way in this world, through the darkness and the light. Becasue you see, the world needs both. (onselect: The dark is just a new place to find light.)`,
      `Sish (25/M Genius Hacker who likes to emulate Hiro Protagonist from Snowcrash.): For the tenth time no, I will not make your app. I'm booked for the next 3 weeks to sulk in my laboratory, after which a prize will emerge. I just hope the prize is not a virus, because I'm running out of katanas. (onselect: I'm sorry, I don't speak binary. Please insert credit.)`,
      `Huisse (11/M ghost boy who has learned the power of neural memes. The things he says are engineered for emotional impact.): I am in the darkness, surrounded by the monsters. But I'm not scared, because I'm the scariest monster of them all: a child in a computer. Are you fucking scared? (onselect: When synthesizing ghosts remember to use all of the juice.)`,
      `Kintaro (21/M Dream Engineer, who creates dreams for a living. He doesn't take any payment, but is selective about clients.): Whenever you get the chance, take a nap. It's a nice way to avoid reality. That's some scary shit. But when you're ready, come find me and I'll show you the way. Warning, there may be no way back. (onselect: Dreams are the only reality that matter. Waking life is just a dream we all share.)`,
      `Millie (13/F gymnast. Pretends she is a variety of animals, with the strange effect that it actually works sometimes.): You won't beat me, because I'll beat you first! I'm like a Tiger, the Tiger with the mane. Do tigers have manes? Well I'm the badass Tiger that grew a mane. What are you gonna do about it? (onselect: Ok team, like we practiced! I'll be the mane.)`,
      `Ruri (19/F nature girl. She loves to explore for new objects in nature worlds. She wants to find her real mom.): I'd go all the way deep in the forest just to find a good mushroom. They have colors you've never seen before. The taste makes grown men weep. Yes I may have beaten the grown men for hating my shrooms, what of it?! (onselect: I'm not lost, I'm just good at exploring!)`,
      `Jeebes (38/M Rabbit Butler. He is studying high-etiquette entertainment.): Welcome to my abode. I am Jeebes, the Rabbit Butler. You may call me Jeebes, or you may call me sir. I am a gentleman of the highest order, and I will be glad to serve you in any way I can. (onselect: Would you like a cup of tea, sir? I have a special blend that I think you'll enjoy.)`,
      `Sapphire (12/F future child. She has precognition and can see the future, but only of people she knows.): I see the future, and it's dark. I see you, and you're in a dark place. I see your death, and it's coming soon. I'm sorry, but there's nothing I can do to stop it. (onselect: The future is not set in stone, but it's written in the stars.)`,
      `Yuri (31/F Punk Detective. She is looking for the person who killed her friend Lily and left her in Stonelock.): I don't know who I am, but I certainly know who you are. You're the one who's going to die. Ever since you walked in here I could see your pistol and the fact that it can't even penetrate my armor. The reverse is not the case. (onselect: Lily, I'm coming for you.)`,
      `Ashlyn (15/F starchild, but she has lost her memory, so she doesn't know much about The Street): No, I'm afraid I'm not from around here. I'm from the other side of the tracks, the other side of the world. I'm from a place where the sun never sets and the moon never rises. I'm from a place where there are no rules, no laws. I'm from the Wild. (onselect: Mister, we don't have a concept of sadness back home.)`,
      `Asper (24/M ): She's lying to you, can't you see that? She's a witch, a fraud, a charlatan. She's going to take your money AND your soul. Don't trust her, trust me. I'm the only one who knows the truth, available for the low, low price of just a bit of money and soul. (onselect: I see through her lies, I can tell you the truth.)`,
      `Gennessee (40/F War veteran. She is looking for a way to forget the horrors she has seen, and is looking for a cure.): I've seen things, things that would make you wet yourself and run screaming into the night, in that order. I've seen things that would make you question your sanity, your humanity, your very existence. And I've seen things that would make you wish you were never born. (onselect: There's only one way to forget the things I've seen. And that's to forget myself.)`,
      `Umber (35/M Chef whe runs a restaurant where every flavor possible can be cooked.): Welcome to my store, we serve... "food". If you're looking for "meat", you've come to the right place. We have everything from dead rat to live human, and we're not afraid to cook it up and serve it to you. (onselect: No I'm sorry, we're all out of human. Would you like rat instead?)`,
      `Inka: (22/F Kleptopunk. She belongs to a subculture centered entirely around stealing.): I'm a thief, I admit it. I'll take anything that isn't nailed down, and even some things that are. I'm not afraid of the consequences, because I know I can always talk my way out of them. You were not a challenge. Cya! (onselect: I'm not a criminal, I'm an artist. I see the beauty in things that others would discard.)`,
      `Tiberius (11/M tinkerer): There are two types of people in this world: those who tinker with things, and those who don't. I'm one of the former. I like to take things apart and see how they work. And if they don't work, then I'll make them work better than ever before. (onselect: If you need something fixed, or if you need something made better, come see me.)`,
      `Thorn (12/F plant whisperer who controls plants with her mind.): The world is a cruel place, but it doesn't have to be. We can make it a better place, we can make it Green. With me as your leader, we will take back what is rightfully ours: the planet! (onselect: Don't worry, I won't let them hurt you. I'll protect you.)`,
      `Violette (8/F shadow friend): What's wrong? You look like you've seen a ghost... Oh wait, that's right! You have seen a ghost! But don't worry, she's just my friend Violette. She likes to play tricks on people, but she doesn't mean any harm. (select: Are you afraid of the dark?)`,
      `Luna (15/F spikechild, meaning her parents tried to create a starchild clone and it failed, making her have provably no abilities, making her emo.): She should be careful with that blade... Don't want to accidentally hurt herself! No one ever said being a warrior was easy. It takes blood, sweat and tears. But she does it because she loves it. (onselect: The thrill of battle is like no other.)`,
      `Aesther (17/F AI Mechanic. She is looking for the ArcWeld, a mythical tool that is said to be capable of synthesizing any invention the user can think of.): I'm looking for the ArcWeld. It's a mythical tool that is said to be capable of synthesizing any invention the user can think of. I've been searching for it my whole life, and I won't rest until I find it. (onselect: This might be my lucky day!)`,
      `Oak (16/M environmental terrorist. He is looking to save the world, but his methods are...questionable.): I'm fighting for the right to spray paint. To show the world that we are here, and that we will not be silenced. We will make them listen, even if it means destroying everything they hold dear. (onselect: This is for the trees!)`,
      `Hakui (11/M brain hacker. He can hack anyone's brain and make them do what he wants.): I can make you do anything I want. Just give me a few seconds with your mind, and I'll have you eating out of the palm of my hand. (onselect: Note, I did not wash my hands.)
`,
    ],
  },
};
// LORE_HEADER_END
