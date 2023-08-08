export class TwoWayMap {
  constructor(map, subkey) {
    this.map = map;
    this.reverseMap = {};
    for (const key in map) {
      let value = map[key];
      if (subkey) {
        value = value[subkey];
      }
      this.reverseMap[value] = key;
    }
  }

  static build(map, subkey) {
    return new TwoWayMap(map, subkey);
  }

  get(key) {
    return this.map[key];
  }

  revGet(key) {
    return this.reverseMap[key];
  }
}

export const getNestedProperty = (object, path) => {
  const keys = path.split(".");
  let reference = object;

  for (const key of keys) {
    if (!reference?.hasOwnProperty(key)) {
      return undefined; // Property doesn't exist
    }
    reference = reference[key];
  }

  return reference;
};

export const findFirstNOccurrences = (array, matcher, n) => {
  const result = [];
  let count = 0;

  for (const item of array) {
    if (matcher(item)) {
      result.push(item);
      count++;

      if (count === n) {
        break;
      }
    }
  }

  return result;
};
