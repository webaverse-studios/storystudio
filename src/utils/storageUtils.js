function generateTxtFile(data) {
  if (!data) {
    return null;
  }

  return new File([new Blob([data], { type: "text/plain" })], "image.txt");
}
async function getText(blob) {
  if (!blob) {
    return "";
  }

  return await blob.text();
}

export async function uploadFile(w3s, data) {
  if (!w3s || !data) {
    console.log("no data");
    return;
  }

  const file = generateTxtFile(data);
  const cid = await w3s.put([file]);
  const st = await w3s.status(cid);
  console.log(st);
  return cid;
}

export async function downloadFile(w3s, cid) {
  if (!w3s) {
    return;
  }

  console.log("downloading " + cid);
  const res = await w3s.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  const files = await res.files();
  return await getText(files[0]);
}

export async function deleteFile(w3s, cid) {
  const res = await w3s.delete(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(
      `failed to delete ${cid} - [${res.status}] ${res.statusText}`
    );
  }
}
