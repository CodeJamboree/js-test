import { isFocusedName } from "./isFocusedName.js";
import { isOtherTestFocused } from "./isOtherTestFocused.js";
import { isSkippedName } from "./isSkippedName.js";
import { isTest } from "./isTest.js";

export const isRunnableTest = ([key, value]: [string, any], index: number, all: [string, any][]) => {
  if (!isTest([key, value])) return false;
  if (isSkippedName(key)) return false;
  if (isFocusedName(key)) return true;
  return !isOtherTestFocused(index, all);
}
