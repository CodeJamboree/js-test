import { Entries, TestFunction } from "../global.js";
import { isFocusedName } from "./isFocusedName.js";
import { isSkippedName } from "./isSkippedName.js";

export const isOtherTestFocused = (excludeIndex: number, others: Entries<TestFunction>) => others
  .toSpliced(excludeIndex, 1)
  .filter(([key, value]) => !(value.skip || isSkippedName(key)))
  .some(([key, value]) => value.focus || isFocusedName(key))
