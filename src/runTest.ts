import { RunningState, SuiteSetup, TestState } from "./global.js";
import { logFailing } from "./log/logFailing.js";
import { logPassing } from "./log/logPassing.js";

export const runTest = async (test: Function, setup: SuiteSetup, testState: TestState, runningState: RunningState) => {
  try {
    await runningState.beforeEach?.();
    await setup.beforeEach?.();
    let { timeoutMs } = runningState;
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
    await runningState.afterEach?.();
    runningState.passed++;
    logPassing(testState, runningState);
  } catch (error) {
    await setup.afterEach?.();
    await runningState.afterEach?.();
    testState.error = error;
    runningState.failures.push(testState);
    runningState.failed++;
    logFailing(testState, runningState);
  }
}