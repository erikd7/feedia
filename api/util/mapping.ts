// @ts-ignore

//Take an arry and make it a hash map
//[ { id: 1, key: 'BOOK' }, { id: 2, key: 'MOVIE' } ] ===> { BOOK: 1, MOVIE: 2 }
export const arrayToHash = (
  array: Array<any>,
  key: string = "key",
  getValue: Function = (obj: any) => obj.id,
  { capitalizeKey = true } = {}
) =>
  array.reduce((hash, row) => {
    let keyName = row[key];
    if (capitalizeKey) keyName = keyName.toUpperCase();
    hash[keyName] = getValue(row);
    return hash;
  }, {});

//Swap object key and value
// {a: b} ===> {b: a}
export const objectSwap = (object: any) =>
  Object.entries(object).reduce((swapped, entry) => {
    const [key, value] = entry;
    // @ts-ignore
    swapped[value] = key;
    return swapped;
  }, {});
