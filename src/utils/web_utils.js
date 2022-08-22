import axios from "axios";

export async function download_content(url) {
  const file = await axios.get(url);
  return file.data;
}