import { download_content } from "./web_utils";
import url from "url";
import path from "path";

const scripts = [];

export async function setup_scripts(urls) {
  if (!urls || urls?.length <= 0) {
    return;
  }

  scripts.splice(0, scripts.length);

  const _urls = urls.split("|");
  for (const _url of _urls) {
    if (_url && _url?.length > 0) {
      const parsedUrl = url.parse(_url);
      const fileName = path
        .basename(parsedUrl.pathname)
        .replace(".js", "")
        .replace(".txt", "");
      if (getScript(fileName) === undefined) {
        const file = await download_content(_url);
        scripts.push({
          name: fileName,
          code: file,
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
