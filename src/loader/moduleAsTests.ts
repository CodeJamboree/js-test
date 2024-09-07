import { Module } from "./modules/getModules.js";
import { RunningState, SetupName, TestSuite } from "../global.js";
import { isFocusedName } from "./isFocusedName.js";
import { isRunnableTest } from "./isRunnableTest.js";
import { isTest } from "./isTest.js";
import { isTestSetup } from "./isTestSetup.js";

export const moduleAsTests = (state: RunningState, module: Module, skip: boolean): TestSuite | undefined => {

  const entries = Object.entries(module);
  const tests = entries.filter(isTest);

  if (skip) {
    state.skipped += tests.length;
    return;
  }

  const runnable = tests.filter(isRunnableTest);

  state.skipped += tests.length - runnable.length;
  if (runnable.length === 0) return;

  const setup = entries.filter<[SetupName, Function]>(isTestSetup);
  const focused = runnable.some(([key]) => isFocusedName(key));

  return {
    runnable: runnable.length,
    focused,
    setup: Object.fromEntries(setup),
    tests: runnable
  }
}