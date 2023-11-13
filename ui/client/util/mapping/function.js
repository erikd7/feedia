//Use for aggregating functions. Turns an array of functions into one big function
export const functionArrayToFunction = (functionArray = []) =>
  functionArray.reduce(
    (aggFn, currentFn) => () => {
      aggFn();
      currentFn();
    },
    () => {}
  );
