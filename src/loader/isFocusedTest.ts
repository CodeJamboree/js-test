import { isTest } from "./isTest.js";

export const isFocusedTest = ([key, value]: [string, any]) =>
  isTest([key, value]) &&
  key.startsWith("f_");
