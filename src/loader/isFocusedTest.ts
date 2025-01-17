import { isTest } from "./isTest.js";

export const isFocusedTest = ([key, value]: [string, any]) =>
  isTest([key, value]) && (
    value.focused ||
    key.startsWith("f_")
  );
