import axios from "axios";
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

export const compressObject = (obj) => {
  const jsonStr = JSON.stringify(obj);
  const compressed = lz.compress(jsonStr);
  return compressed;
};

export const decompressObject = (str) => {
  const decompressed = lz.decompress(str);
  const obj = JSON.parse(decompressed);
  return obj;
};

export const getRandomObjectFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export function setOpenAIKey(newKey) {
  localStorage.setItem("openai_key", newKey);
}

export function getOpenAIKey() {
  return localStorage.getItem("openai_key");
}