import { getCallback } from "./getCallback.js";

export const endOfLine = (_type: StandardType, args: writeArgs) => {
  const callback = getCallback(args);
  if (callback) {
    callback();
    return true;
  }
  return false;
}