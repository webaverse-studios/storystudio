import axios from "axios";


export const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
});

export const download_content = async (url) => {
    const file = await axios.get(url);
    return file.data;
  }