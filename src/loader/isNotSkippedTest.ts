import { isRunnableTest } from "./isRunnableTest.js";
import { isTest } from "./isTest.js";

export const isNotSkippedTest = (entry: [string, any], testIndex: number, tests: [string, any]) =>
  isTest(entry) && !isRunnableTest(entry, testIndex, tests);
