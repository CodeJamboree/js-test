import { SetupName } from "../global.js";
import { isFunction } from "./isFunction.js";
import { isSetupName } from "./isSetupName.js";
import { isSkippedName } from "./isSkippedName.js";

export const isTestSetup = (entry: [PropertyKey, any]): entry is [SetupName, Function] => {
  const [key, value] = entry;
  return isSetupName(key) && isFunction(value) && !isSkippedName(key)
}