import { isFocusedName } from "./isFocusedName.js";
import { isTest } from "./isTest.js";

export const isOtherTestFocused = (excludeIndex: number, others: [string, any][]) => others
  .toSpliced(excludeIndex, 1)
  .filter(isTest)
  .some(([key,]) => isFocusedName(key))
