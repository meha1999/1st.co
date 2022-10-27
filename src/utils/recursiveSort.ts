const recursiveSort = (object: Record<string, any>) =>
  Object.keys(object)
    .sort()
    .reduce((obj: Record<string, any>, key) => {
      obj[key] =
        typeof object[key] === "object"
          ? recursiveSort(object[key])
          : object[key];
      return obj;
    }, {});

export default recursiveSort;
