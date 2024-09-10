import { Entries, Entry, TestFunction } from "../global.js";
import { isFocusedName } from "./isFocusedName.js";
import { isSkippedName } from "./isSkippedName.js";

export const splitTestCases = (tests: Entries<TestFunction>, test: Entry<TestFunction>): Entries<TestFunction> => {
  const [name, func] = test;
  const argCount = func.length;
  const focused = func.focus || isFocusedName(name);
  const skipped = func.skip || isSkippedName(name);
  if (focused && skipped) {
    throw new Error(`${name} is focused and skipped.`);
  }

  if (!func.testCases) {
    if (argCount > 0) {
      throw new Error(`${name} has arguments, but missing 'testCases'`);
    }
    tests.push(test);
    return tests;
  }
  if (argCount === 0) {
    throw new Error(`${name} does not have arguments, but has 'testCases'`);
  }

  if (!Array.isArray(func.testCases)) {
    throw new Error(`${name}.testCases must be an array.`);
  }

  if (func.testCases.length === 0) {
    throw new Error(`${name}.testCases[] has no test cases.`);
  }
  const maxDigits = (func.testCases.length - 1).toString().length;

  func.testCases.forEach((testCase, index) => {
    if (!Array.isArray(testCase)) {
      throw new Error(`${name}.testCases[${index}] must be an array of arguments.`);
    }
    if (testCase.length !== argCount) {
      throw new Error(`${name}.testCases[${index}] has ${testCase.length} arguments, but ${name} expects ${argCount}.`);
    }
    const testCaseFunction: TestFunction = Object.assign(func.bind(null, ...testCase), func);
    testCaseFunction.testCaseIndex = index;
    tests.push([
      `${name}[${index.toString().padStart(maxDigits, '0')}]`,
      testCaseFunction
    ]);
  });
  return tests;
}