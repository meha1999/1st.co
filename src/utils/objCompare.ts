import recursiveSort from "./recursiveSort";

const isObjEqual = (firstObject, secondObject) => {
  const firstObjectSort = recursiveSort(firstObject);
  const secondObjectSort = recursiveSort(secondObject);
  return JSON.stringify(firstObjectSort) === JSON.stringify(secondObjectSort);
};

export default isObjEqual;
