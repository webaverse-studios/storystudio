import { Configuration, OpenAIApi } from "openai";
import { getNewId } from "./misc_utils";

const configuration = new Configuration({ apiKey: localStorage.getItem("openai_key") ?? '' });
const openai = new OpenAIApi(configuration);

export function setOpenAIKey(newKey){
  localStorage.setItem("openai_key", newKey);
  configuration.apiKey = newKey;
}

export function getOpenAIKey(){
  return configuration.apiKey;
}

async function openaiRequest(prompt, stop, model = "davinci") {
  const completion = await openai.createCompletion({
    model: model,
    prompt: prompt,
    stop: stop,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0.8,
    temperature: 0.8,
    max_tokens: 128,
  });
  if (completion.data.choices?.length > 0) {
    return completion.data.choices[0].text;
  } else {
    return "";
  }
}

async function generateScene() {
  const scenePrompt = `Location: Exorphys Graetious\nDescription: That sounds hard to pronounce. It must be important. Or the person who named it is an asshole. Or their parents were assholes. Just a line of assholes.,
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
  const objectPrompt = `AI anime avatars in a virtual world. They have human-level intelligence and unique and interesting personalities.
    The tone of the series is on the surface a children's show, but with a dark subtext. It is similar to Pokemon, Dragon Ball, Rick and Morty, and South Park, but with the aesthetic of Studio Ghibli.
    We want some really funny and interesting commentary to come from these avatars. They should be witty, clever, interesting, usually with a pun or a joke, and suggesting of some action that the character will perform there.
    The comments are of the following form:
    Object: Exorphys Graetious\nDescription: That sounds hard to pronounce. It must be important. Or the person who named it is an asshole. Or their parents were assholes. Just a line of assholes.,
    Object: Orange Fields\nDescription: They say a bloodstain's orange after you wash it three or four times in a tub. Still those fields sound interesting!,
    Object: Amenki's Lab\nDescription: I hate that guy Amenki and his stupid lab. I barely survived his last experiment. Maybe it's time for vengeance.,
    Object: Sunscraper\nDescription: I bet it's amazing to see the world from up there. I guess as long as you don't fall down. I'm not scared though!,
    Object: Bastards bog\nDescription: What a dump. I can't believe anyone would want to live here. The smell is terrible and the people are all dirty. I'm sorry I shouldn't be joking that they're poor.,
    Object: The Great Tree\nDescription: It's really not that great, but the music is nice. Yeah apparently they decided trees should come with music.,
    Object: The Trash\nDescription: Ugh, the dregs of society live here. It's the worst. It's just a disgusting slum. I'm honestly surprised there's not more crime.,
    Object:`;

  const resp = await openaiRequest(objectPrompt, [".,\n", "Object:"]);
  const lines = resp.split("\n");
  return {
    name: lines[0].trim(),
    description: lines[1].replace("Description: ", "").trim(),
  };
}

 function makeId(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function generate(type, existingData) {
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
  }

  if (res.name?.length > 0) {
    res.shortname =
      res.name.replace(" ", "").trim().toLowerCase() +
      "#" + makeId(5);
  }

  return res;
}
