import axios from "axios";
import dungeoneer from "dungeoneer";
import { stable_diffusion_url, voice_url } from "../constants";
if (!global) global = globalThis;
import { Buffer } from "buffer";
import lz from "lz-string";

export function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

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

export async function openaiRequest(
  openai,
  prompt,
  stop,
  model = "davinci",
  top_p = 1,
  frequency_penalty = 1,
  presence_penalty = 1,
  temperature = 1,
  max_tokens = 256,
  best_off = 1
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
    best_of: best_off,
  });
  if (completion.data.choices?.length > 0) {
    return completion.data.choices[0].text;
  } else {
    return "";
  }
}

export const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

export async function download_content(url) {
  const file = await axios.get(url);
  return file.data;
}

export const generateDungeon = () => {
  const d = dungeoneer.build({
    width: 25,
    height: 25,
  });
  console.log("d is", d);
  return d;
};

export const generateImage = async (text) => {
  const resp = await axios.get(stable_diffusion_url, {
    params: {
      s: text,
    },
    responseType: "arraybuffer",
  });
  const base64String = Buffer.from(resp.data, "binary").toString("base64");
  return base64String;
};

export const compressObject = (obj) => {
  const jsonStr = JSON.stringify(obj);
  const bytes = Buffer.byteLength(jsonStr, "utf-8");
  const compressed = lz.compress(jsonStr);
  const bytes2 = Buffer.byteLength(compressed, "utf-8");
  return compressed;
};

export const decompressObject = (str) => {
  const decompressed = lz.decompress(str);
  const obj = JSON.parse(decompressed);
  return obj;
};

export const makeVoiceRequest = async (character, text) => {
  const resp = await axios.get(voice_url, {
    params: {
      voice: character,
      s: text,
    },
    responseType: "blob",
  });
  return resp.data;
};

export const getRandomObjectFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
