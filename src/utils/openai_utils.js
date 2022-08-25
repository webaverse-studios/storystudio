import { Configuration, OpenAIApi } from "openai";
import {
  makeBattleIntroductionPrompt,
  makeBattleIntroductionStop,
  makeLorePrompt,
  parseLoreResponses,
} from "./lore/lore-model";

const configuration = new Configuration({
  apiKey: localStorage.getItem("openai_key") ?? "",
});
const openai = new OpenAIApi(configuration);

export function setOpenAIKey(newKey) {
  localStorage.setItem("openai_key", newKey);
  configuration.apiKey = newKey;
}

export function getOpenAIKey() {
  return configuration.apiKey;
}

async function openaiRequest(
  prompt,
  stop,
  model = "davinci",
  top_p = 1,
  frequency_penalty = 0.8,
  presence_penalty = 0.8,
  temperature = 0.8,
  max_tokens = 128
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
  });
  console.log(completion);
  if (completion.data.choices?.length > 0) {
    return completion.data.choices[0].text;
  } else {
    return "";
  }
}

async function generateScene() {
  const scenePrompt = `AI anime avatars in a virtual world. They have human-level intelligence and unique and interesting personalities.
  The tone of the series is on the surface a children's show, but with a dark subtext. It is similar to Pokemon, Dragon Ball, Rick and Morty, and South Park, but with the aesthetic of Studio Ghibli.
  We want some really funny and interesting commentary to come from these avatars. They should be witty, clever, interesting, usually with a pun or a joke, and suggesting of some action that the character will perform there.
  The comments are of the following form:
  Location: Exorphys Graetious\nDescription: That sounds hard to pronounce. It must be important. Or the person who named it is an asshole. Or their parents were assholes. Just a line of assholes.,
  Location: Exorphys Graetious\nDescription: That sounds hard to pronounce. It must be important. Or the person who named it is an asshole. Or their parents were assholes. Just a line of assholes.,
  Location: Amenki's Lab\nDescription: I hate that guy Amenki and his stupid lab. I barely survived his last experiment. Maybe it's time for vengeance.
  Location: Sunscraper\nDescription: I bet it's amazing to see the world from up there. I guess as long as you don't fall down. I'm not scared though!,
  Location: Bastards bog\nDescription: What a dump. I can't believe anyone would want to live here. The smell is terrible and the people are all dirty. I'm sorry I shouldn't be joking that they're poor.,
  Location: The Great Tree\nDescription: It's really not that great, but the music is nice. Yeah apparently they decided trees should come with music.,
  Location: The Trash\nDescription: Ugh, the dregs of society live here. It's the worst. It's just a disgusting slum. I'm honestly surprised there's not more crime.,
  Location: The Park\nDescription: It's a great place to relax! If you like dogs. I like cats more though. So you can imagine, that causes a few problems...,
  Location: The Woods\nDescription: It's so dark in there! I like it. It feels spooky and dangerous. Maybe there are monsters. And I can kill them all.,
  Location: The Beach\nDescription: It's so beautiful here! I could stare at the ocean all day. And the sun is so warm. I could definitely get used to this.,
  Location: The City\nDescription: It's so loud and crowded! But there's so much to do. I love it. I could never get bored here.,
  Location: Maze of Merlillion\nDescription: response: This place is so poorly designed! I'm sure nobody could ever find their way out. Unless they have a map or something. But even then, good luck.,
  Location: Freaky Funkos Fried Fox\nDescription: I'm not sure how I feel about foxes being eaten. On the one hand, they're cute. But on the other hand, they're a little too foxy.,
  Location: Echidna's Den \nDescription: It's weird that there are so many snake dens around. I mean, it's not like echidnas are poisonous or anything. Wait what, Echidnas aren't snakes?!,
  Location: Fennek's Forest\nDescription: There's a lot of fenneks in this forest. Weird that they all hang out together like that. But I guess it's better than being eaten by a lion or something.,
  Location: The Abyss\nDescription: It's so dark and scary down there! You can survive long enough to turn on your flashlight, only to be scared to death by what you reveal,
  Location: Castle of Cygnus\nDescription: It's so cold in there! Somehow the princess can stand it. Maybe she just doesn't feel the cold. Or maybe she has a furnace.,
  Location: Lost Minds Nightclub\nDescription: You won't lose your mind here, but if you lose your mind that's where you'll end up. Then you get to party until your parents come pick you up.,
  Location: Barrens of Boreas\nDescription: False advertising! This place is nothing but a bunch of rocks. There's no water or anything. What kind of bar is this?,
  Location:`;

  const resp = await openaiRequest(scenePrompt, [".,\n", "Location:"]);
  const lines = resp.split("\n");
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
}

async function generateCharacter() {
  const characterPrompt = `Character: "Bailey Scritch"\nDescription: A witch studying at the Witchcraft School for Witchcraft and Redundancy.\nInventory: 1 wand, 1 shield, 1 diamond
    Character: "Axel Brave"\nDescription: A tall and handsome boy. He is a hacker with a bad reputation.\nInventory: 1 keyboard, 1 laptop, 1 knife, 1 pistol
    Character: "Bailey Scritch"\nDescription: A witch studying at the Witchcraft School for Witchcraft and Redundancy.\nInventory: 1 wand, 1 bert, 10 potions
    Character: "Lillith Lecant"\nDescription: A painter who uses a magical multicolored brush which leaves marks in the air.\nInventory: 1 brush, colour palletes
    Character: "Aerith Gainsborough (Final Fantasy)"\nDescription: A flower girl with long brown hair. She's wearing a pink dress and has a big smile on her face.\nInventory: petal staff, fire talisman
    Character: "Stephen Gestalt"\nDescription: A fine gentleman in a dress suit.\nInventory: 1000 Gold coins, diamonds, a smart watch
    Character: "Ghost Girl"\nDescription: A rotten girl in a nightgown, like from The Ring.\nInventory: souls, a skull
    Character: "Mister Miyazaki"\nDescription: An impish being from the 5th dimension.\nInventory: energy staff, heavy armor
    Character: "Fortune Teller"\nDescription: A gypsy woman with a crystal ball.\nInventory: 1 chrystal ball, diamonds
    Character: "Kitten"\nDescription: A small black kitten with big green eyes.\nInventory: 1 cloth, 1 ball, 1 laser
    Character: "Green Dragon"\nDescription: A chubby dragon with short wings. It is a very cartoony avatar.\nInventory: gold bars, emeralds
    Character: "Dawn (Pokemon)"\nDescription: A young girl with a Pikachu on her shoulder.\nInventory: Pikachu, pokeballs
    Character: "Terra Branford (Final Fantasy)"\nDescription: A magician in a mech.\nInventory: 1 2-hand sword, gold coins
    Character: "Sora (Kingdom Hearts)"\nDescription: A young boy with big spiky hair. He's wearing a black hoodie and has a keyblade at his side.\nInventory: 1 blade, 2 keys
    Character:`;

  const resp = await openaiRequest(characterPrompt, [".,\n", "Character:"]);
  const lines = resp.split("\n");
  const inventory =
    lines.length > 2 ? lines[2].replace("Inventory: ", "").trim() : "";
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
    inventory: inventory,
  };
}

async function generateObject() {
  const objectPrompt = `
    Object: "The Great Deku Tree"\nDescription: An enormous, grey, old tree. It is partly petrified.
    Object: "The Enchiridion"\nDescription: A magical spellbook with very old pages. It is fragile.
    Object: "rainbow-dash.gif"\nDescription: Animaged gif image of Rainbow Dash from My Little Pony, in the style of Nyan Cat.
    Object: "The Stacks Warehouse"\nDescription: A cyberpunk container in a trailer park. It is inspired by the house of Hiro Protagonist in Snow Crash
    Object: "The Infinity Sword"\nDescription: An ancient sword planted in a stone. It is heavily overgrown and won't budge.
    Object: "Tree"\nDescription: A basic tree in the park.
    Object: "Bench"\nDescription: A basic bench in the park.
    Object: "Glowing Orb"\nDescription: A flying white orb which emits a milky glow on the inside.
    Object: "Lamp Post"\nDescription: A lamp post along the street. It lights up automatically at night
    Object: "Rustic House"\nDescription: A regular townhouse in the country.
    Object: "Jar Of Black"\nDescription: A jar of a disgusting black substance that appears to have a life of its own.
    Object: "Wooden Sign"\nDescription: A wooden sign with some writing on it. It can be chopped down with a sword.
    Object: "ACog"\nDescription: An piece of an ancient technology. It looks very advanced but very old.
    Object: "Jackrabbobbit"\nDescription: A grotesque creature that looks like a genetic mix of species that should not be mixed.
    Object: "Black One"\nDescription: A very dark animal that hides in the shadows. Nobody knows much about it.
    Object: "Herb of Sentience"\nDescription: A plant that makes you feel emotions when you get close.
    Object: "Flower Bed"\nDescription: An arrangement of flowers in their natural habitat.
    Object: "Ripe Fruit"\nDescription: A fruit that has fallen from a tree. It is starting to rot.
    Object: "Brightfruit"\nDescription: A magical fruit that makes your skin glow for 24 hours.
    Object: "Goblin"\nDescription: A small, green creature with pointy ears. It is very ugly.
    Object: "Trash Heap"\nDescription: A pile of garbage. It smells really bad.
    Object: "Gucci Bag"\nDescription: An exclusive designer bag that is very expensive.
    Object: "Pile Of Bones"\nDescription: A pile of bones. It looks like somebody died here.
    Object: "Crunchy Grass"\nDescription: A heavenly bite from nature. It is juicy, fresh grass.
    Object: "doge.png"\nDescription: An image of the Doge meme.
    Object: "Magikarp"\nDescription: A common fish that is known for being very weak.
    Object: "Muscle Car"\nDescription: A car that is designed for speed and power. A very dark animal that hides in the shadows. Nobody knows much about it.
    Object:`;

  const resp = await openaiRequest(objectPrompt, [".,\n", "Object:"]);
  const lines = resp.split("\n");
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
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

const generateLore = async (data) => {
  const _resp = [];
  for (let i = 0; i < data["character"].length; i++) {
    const lorePrompt = makeLorePrompt({
      settings: [],
      characters: data["character"],
      messages: [],
      objects: data["object"],
      dstCharacter: data["character"][i],
    });

    const resp = await openaiRequest(
      lorePrompt,
      ["Input:", "Output:"],
      "davinci",
      1,
      1,
      1,
      1,
      256
    );

    const battleDialoguePrompt = makeBattleIntroductionPrompt({
      name: data["character"][i].name,
      bio: data["character"][i].description,
    });

    const resp2 = await openaiRequest(
      battleDialoguePrompt,
      makeBattleIntroductionStop()
    );

    const loreResp = parseLoreResponses(resp);
    for (let i = 0; i < loreResp.length; i++) {
      loreResp[i].rpgDialogue = resp2;
      _resp.push(loreResp[i]);
    }
  }

  return _resp;
};

export async function generate(type, data) {
  const res = {
    type: type,
    name: "",
    shortname: "",
    enabled: true,
    description: "",
    inventory: [],
  };
  let resp = undefined;

  switch (type) {
    case "scene":
      resp = await generateScene();
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "character":
      resp = await generateCharacter();
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "object":
      resp = await generateObject();
      res.name = resp.name;
      res.description = resp.description;
      break;
    case "npc":
      resp = await generateCharacter();
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "mob":
      resp = await generateCharacter();
      res.name = resp.name;
      res.description = resp.description;
      res.inventory = resp.inventory;
      break;
    case "data":
      resp = await generateLore(data);
      return resp;
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
