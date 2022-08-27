
export async function getFile() {
  const file = await new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      resolve(e.target.files[0]);
    };
    input.click();
  });
  return file;
}
