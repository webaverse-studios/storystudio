import * as fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import { lore } from "../constants.js";

const defaultOpenAIParams = {
  model: "davinci",
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 1,
  temperature: 1,
  max_tokens: 256,
  best_of: 1,
};

export function shuffleArray(array, limit = 10) {
  const shortenArray = (array) => {
    if (array.length > limit) {
      return array.slice(0, limit);
    }
    return array;
  };
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return shortenArray(array);
}

async function query(openai, params) {
  let response = null;
  try {
    response = await openai.createCompletion(params);
    return response.data.choices[0].text;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log(e.message);
    }
    return "";
  }
}

async function test_prompt(times, openai, type, params) {
  const results = [];
  for (let i = 0; i < times; i++) {
    params.prompt = createPrompt(
      type === "npc" || type === "mob" ? "character" : type
    );
    console.log("Epoch: ", i);
    const result = await query(openai, params);
    results.push({ epoch: i, prompt: params.prompt, result });
  }
  return results;
}

const createPrompt = (type) => `\
${lore[type].prompt}
${shuffleArray(lore[type].examples).join("\n")}
prompt:`;

const run = async () => {
  const myArgs = process.argv.slice(2);
  const type = myArgs[0];
  const epochs = parseInt(myArgs[1] ?? "10");
  const key = myArgs[2];

  const configuration = new Configuration({ apiKey: key });
  const openai = new OpenAIApi(configuration);
  const _data = defaultOpenAIParams;

  const {
    model,
    top_p,
    frequency_penalty,
    presence_penalty,
    temperature,
    max_tokens,
    best_of,
  } = _data;

  const res = await test_prompt(epochs, openai, type, {
    model,
    prompt: "",
    stop: [".\n", "prompt:"],
    top_p,
    frequency_penalty,
    presence_penalty,
    temperature,
    max_tokens,
    best_of: best_of,
  });

  const fileName = `${type}_` + new Date().getTime() + ".json";
  fs.writeFileSync(fileName, JSON.stringify(res));
  console.log("finished");
};

run();
