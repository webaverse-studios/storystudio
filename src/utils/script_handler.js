import { download_content } from "./web_utils";
import data from "./urls.json";

const scripts = [];

export async function setup_scripts() {
  const urls = data.urls;
  if (!urls || urls?.length <= 0) {
    return;
  }

  scripts.splice(0, scripts.length);

  for (const _url of urls) {
    if (_url && _url.name?.length && _url.url?.length > 0) {
      const fileName = _url.name;
      if (getScript(fileName) === undefined) {
        const file = await download_content(_url.url);
        scripts.push({
          name: fileName,
          code: Function("{ return " + file + " }"),
        });
      } else {
        console.log(`Script ${fileName} already exists.`);
      }
    }
  }
}

export function getScript(name) {
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].name === name) {
      return scripts[i].code;
    }
  }

  return undefined;
}
