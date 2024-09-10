import { ExpectationError } from "./expect/ExpectationError.js";
import { RunningState, SuiteSetup, TestFunction, TestState } from "./global.js";
import { logFailing } from "./log/logFailing.js";
import { logPassing } from "./log/logPassing.js";

const maxSignedInt32 = 0x7FFFFFFF;
export const runTest = async (test: TestFunction, setup: SuiteSetup, testState: TestState, runningState: RunningState) => {
  try {
    await runningState.beforeEach?.();
    await setup.beforeEach?.();
    await test.before?.();
    let { timeoutMs } = runningState;
    if ('timeoutMs' in test) {
      timeoutMs = test.timeoutMs as number;
    }
    if (timeoutMs > maxSignedInt32) {
      timeoutMs = maxSignedInt32;
    } else if (timeoutMs < 0) {
      timeoutMs = 0;
    }
    let durationMs = await new Promise<number>(async (resolve, reject) => {
      let timeout = setTimeout(() => {

        const time = timeoutMs >= 1000 ?
          `${(timeoutMs / 1000).toLocaleString()}s` :
          `${timeoutMs.toLocaleString()}ms`;

        reject(`Test timed out after ${time}`);
      }, timeoutMs);
      try {
        const timestamp = performance.now();
        await test();
        resolve(performance.now() - timestamp);
      } catch (e) {
        reject(e);
      } finally {
        clearTimeout(timeout);
      }
    });
    await test.after?.();
    await setup.afterEach?.();
    await runningState.afterEach?.();
    if (![maxSignedInt32, 0].includes(timeoutMs) && durationMs > timeoutMs) {
      throw new ExpectationError(durationMs, 'greater than', timeoutMs, 'timeout');
    }
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