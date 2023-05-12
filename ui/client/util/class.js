//Wrapper to call a class function from within JSX
export function callClassFn(object, methodName, methodArgs = []) {
  return object[methodName](...methodArgs);
}
