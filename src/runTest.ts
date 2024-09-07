import { RunningState, SuiteSetup, TestInfo } from "./global.js";
import { logFailing } from "./log/logFailing.js";
import { logPassing } from "./log/logPassing.js";

export const runTest = async (test: Function, setup: SuiteSetup, info: TestInfo, state: RunningState) => {
  try {
    await state.beforeEach?.();
    await setup.beforeEach?.();
    await test();
    await setup.afterEach?.();
    await state.afterEach?.();
    state.passed++;
    logPassing(info, state);
  } catch (error) {
    await setup.afterEach?.();
    await state.afterEach?.();
    info.error = error;
    state.failures.push(info);
    state.failed++;
    logFailing(info, state);
  }
}