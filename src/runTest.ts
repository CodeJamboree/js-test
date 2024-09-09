import { RunningState, SuiteSetup, TestInfo } from "./global.js";
import { logFailing } from "./log/logFailing.js";
import { logPassing } from "./log/logPassing.js";

export const runTest = async (test: Function, setup: SuiteSetup, info: TestInfo, state: RunningState) => {
  try {
    await state.beforeEach?.();
    await setup.beforeEach?.();
    let { timeoutMs } = state;
    if ('timeoutMs' in test) {
      timeoutMs = test.timeoutMs as number;
    }
    if (timeoutMs > 0x7FFFFFFF) {
      timeoutMs = 0x7FFFFFFF;
    } else if (timeoutMs < 0) {
      timeoutMs = 0;
    }
    await new Promise<void>(async (resolve, reject) => {
      let timeout = setTimeout(() => {

        const time = timeoutMs >= 1000 ?
          `${(timeoutMs / 1000).toLocaleString()}s` :
          `${timeoutMs.toLocaleString()}ms`;

        reject(`Test timed out after ${time}`);
      }, timeoutMs);
      try {
        await test();
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        clearTimeout(timeout);
      }
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