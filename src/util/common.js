function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// function updateItem(items, update) {
//   items.forEach((item) => {
//     if (item.newId === update.newId){
//       item.userDetails = update.userDetails;
//     }
//   });
// }

export {getRandomArrayElement};
