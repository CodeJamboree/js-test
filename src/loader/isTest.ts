import { isFunction } from "./isFunction.js";
import { isSetupName } from "./isSetupName.js";

export const isTest = ([key, value]: [string, any]): boolean => !isSetupName(key) && isFunction(value);