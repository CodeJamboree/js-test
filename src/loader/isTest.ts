import { TestFunction } from "../global.js";
import { isFunction } from "./isFunction.js";
import { isSetupName } from "./isSetupName.js";

export const isTest = (value: [string, any]): value is [string, TestFunction] => !isSetupName(value[0]) && isFunction(value[1]);