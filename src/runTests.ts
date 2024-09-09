import { RunningState, TestState, TestSuite } from "./global.js";
import { runTest } from "./runTest.js";

export const runTests = async (suite: TestSuite, runningState: RunningState) => {
  const { setup } = suite;
  await runningState.beforeSuite?.();
  await setup.beforeAll?.();
  const tests = suite.tests;

  for (let testIndex = 0; testIndex < tests.length; testIndex++) {
    const [name, test] = tests[testIndex];
    const testState: TestState = {
      filePath: suite.filePath,
      parents: runningState.parents.slice(),
      name,
      index: testIndex,
      siblings: suite.tests.length
    };
    await runTest(test, setup, testState, runningState);
    if (runningState.failFast && runningState.failed > 0) break;
  }
  await setup.afterAll?.();
  await runningState.afterSuite?.();
}