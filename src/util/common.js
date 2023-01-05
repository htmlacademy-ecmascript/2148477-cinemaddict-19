function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateItem(items, update) {
  return items.map((item) => item.newId === update.newId ? update : item);
}

export {getRandomArrayElement, updateItem};
