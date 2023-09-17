// @ts-ignore

export const arrayToHash = (
  array: Array<any>,
  key: string = "name",
  getValue: Function = (obj: any) => obj.id,
  { capitalizeKey = true } = {}
) =>
  array.reduce((hash, row) => {
    let keyName = row[key];
    if (capitalizeKey) keyName = keyName.toUpperCase();
    hash[keyName] = getValue(row);
    return hash;
  }, {});

export const objectSwap = (object: any) =>
  Object.entries(object).reduce((swapped, entry) => {
    const [key, value] = entry;
    // @ts-ignore
    swapped[value] = key;
    return swapped;
  }, {});
