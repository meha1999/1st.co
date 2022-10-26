const recursiveSort = (object :any) =>
  Object.keys(object)
    .sort()
    .reduce((obj :any, key) => {
      obj[key]  =
        typeof object[key] === "object"
          ? recursiveSort(object[key])
          : object[key];
      return obj;
    }, {});

export default recursiveSort;
