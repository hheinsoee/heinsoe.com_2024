

export const makeUp = (data, pretty, isNull = false) => {
  function mUp(d) {
    var pretty_data = {};
    pretty.forEach((x, i) => {
      // if (d[x] && d[x] !== "null") { pretty_data[x] = d[x] }
      // if (isNull && (d[x] == "undefined" || d[x] == null)) {
      //   d[x] = null;
      // }

      if (d[x]) {
        pretty_data[x] = d[x];
      } else {
        if (isNull) {
          pretty_data[x] = null;
        }
      }
    });
    return pretty_data;
  }
  if (Array.isArray(data)) {
    var result = [];
    data.forEach((d) => {
      result.push(mUp(d));
    });
    return result;
  } else {
    return mUp(data);
  }
};

export const isRequired = (data, need) => {
  var required = [];
  need.forEach((x, i) => {
    if (!data[x]) {
      required.push(x);
    }
  });
  return required.length == 0 ? false : required;
};

// mergeArray(
//   d,
//   "uoms",
//   ["uom_name", "uom_value"],
//   "id"
// )
export const mergeArray = (inputData, as, groupKeys, key) => {
  return inputData
    .reduce((result, item) => {
      const existingItem = result.find((i) => i[key] === item[key]);

      var gpObj = {};
      groupKeys.map((gk) => {
        if (item[gk]) {
          gpObj[gk] = item[gk];
        }
      });
      if (existingItem) {
        existingItem[as].push(gpObj);
      } else {
        result.push({
          ...item,
          [as]: Object.keys(gpObj).length > 0 ? [gpObj] : [],
        });
      }

      return result;
    }, [])
    .map((item) => {
      const { ...rest } = item;
      groupKeys.forEach((key) => delete rest[key]);
      return rest;
    });
};