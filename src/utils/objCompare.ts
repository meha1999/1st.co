import recursiveSort from "./recursiveSort";

const isObjEqual = (firstObject :Object, secondObject:Object) => {
  const firstObjectSort = recursiveSort(firstObject);
  const secondObjectSort = recursiveSort(secondObject);
  return JSON.stringify(firstObjectSort) === JSON.stringify(secondObjectSort);
};

export default isObjEqual;
