const recursiveSort = (object) =>
  Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] =
        typeof object[key] === "object"
          ? recursiveSort(object[key])
          : object[key];
      return obj;
    }, {});

export default recursiveSort;
