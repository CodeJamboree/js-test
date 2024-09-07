import { getCallback } from "./getCallback.js";

export const endOfLine = (args: writeArgs) => {
  const callback = getCallback(args);
  if (callback) {
    callback();
    return true;
  }
  return false;
}