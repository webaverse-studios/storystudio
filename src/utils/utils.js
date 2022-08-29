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
  frequency_penalty = 1.5,
  presence_penalty = 1.5,
  temperature = 1,
  max_tokens = 256,
  best_off = 5
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