import { ExpectationError } from "./expect/ExpectationError.js";
import { RunningState, SetupFunction, SuiteSetup, TestFunction, TestState } from "./global.js";
import { logFailing } from "./log/logFailing.js";
import { logPassing } from "./log/logPassing.js";

const maxSignedInt32 = 0x7FFFFFFF;

interface Cleanup {
  test: boolean,
  suite: boolean,
  run: boolean,
  errors: unknown[]
}
export const runTest = async (test: TestFunction, setup: SuiteSetup, testState: TestState, runningState: RunningState) => {
  const clean = {
    test: false,
    suite: false,
    run: false,
    errors: []
  }
  try {
    await runningState.beforeEach?.();
    clean.run = true;
    await setup.beforeEach?.();
    clean.suite = true;
    await test.before?.();
    clean.test = true;
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
    if (clean.test) {
      clean.test = false;
      await invokeWithoutThrowing(test.after, 'test.after', clean.errors);
    }
    if (clean.suite) {
      clean.suite = false;
      await invokeWithoutThrowing(setup.afterEach, 'testSuite.afterEach', clean.errors);
    }
    if (clean.run) {
      clean.run = false;
      await invokeWithoutThrowing(runningState.afterEach, 'runningState.afterEach', clean.errors);
    }
    if (![maxSignedInt32, 0].includes(timeoutMs) && durationMs > timeoutMs) {
      throw new ExpectationError(durationMs, 'greater than', timeoutMs, 'timeout');
    }
    if (clean.errors.length !== 0)
      throw new ExpectationError('', 'threw', clean.errors, 'cleanup');
    runningState.passed++;
    logPassing(testState, runningState);
  } catch (error) {
    if (clean.test) await invokeWithoutThrowing(test.after, 'test.after', clean.errors);
    if (clean.suite) await invokeWithoutThrowing(setup.afterEach, 'testSuite.afterEach', clean.errors);
    if (clean.run) await invokeWithoutThrowing(runningState.afterEach, 'runningState.afterEach', clean.errors);
    testState.error = error;
    runningState.failures.push(testState);
    runningState.failed++;
    logFailing(testState, runningState);
  }
}
const invokeWithoutThrowing = async (callback: SetupFunction | undefined, name: string, errors: unknown[]): Promise<void> => {
  if (!callback) return;
  try {
    await callback();
  } catch (e) {
    errors.push(e);
    console.error(`Failed to invoke ${name}`);
  }
}