import { Entries, Entry, TestFunction } from "../global.js";
import { isFocusedName } from "./isFocusedName.js";
import { isOtherTestFocused } from "./isOtherTestFocused.js";
import { isSkippedName } from "./isSkippedName.js";
import { isTest } from "./isTest.js";

export const isRunnableTest = ([key, value]: Entry<TestFunction>, index: number, all: Entries<TestFunction>) => {
  if (!isTest([key, value])) return false;
  if (value.skip) return false;
  if (isSkippedName(key)) return false;
  if (value.focus || isFocusedName(key)) return true;
  return !isOtherTestFocused(index, all);
}
