export function getNewId(data) {
  const usedIds = [];
  for (let i = 0; i < data.length; i++) {
    const shortname = data[i].shortname;
    const id = shortname.split("#")[1];
    usedIds.push(id);
  }

  let newId = Math.floor(1000 + Math.random() * 9000);
  while (usedIds.includes(newId)) {
    newId = Math.floor(1000 + Math.random() * 9000);
  }

  return newId;
}
