import { RunningState, SuiteSetup, TestInfo } from "./global.js";
import { logFailing } from "./log/logFailing.js";
import { logPassing } from "./log/logPassing.js";

export const runTest = async (test: Function, setup: SuiteSetup, info: TestInfo, state: RunningState) => {
  try {
    await state.beforeEach?.();
    await setup.beforeEach?.();
    await new Promise<void>(async (resolve, reject) => {
      let timeout = setTimeout(() => {
        reject('Timed Out');
      }, state.timeoutMs);
      await test();
      clearTimeout(timeout);
      resolve();
    });
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