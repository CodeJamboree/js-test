import { RunningState, TestInfo, TestSuite } from "./global.js";
import { runTest } from "./runTest.js";

export const runTests = async (suite: TestSuite, state: RunningState) => {
  const { setup } = suite;
  await state.beforeSuite?.();
  await setup.beforeAll?.();
  const tests = suite.tests;
  for (let testIndex = 0; testIndex < tests.length; testIndex++) {
    const [name, test] = tests[testIndex];
    const info: TestInfo = {
      parents: state.parents.slice(),
      name,
      index: testIndex,
      siblings: suite.tests.length
    };
    await runTest(test, setup, info, state);
  }
  await setup.afterAll?.();
  await state.afterSuite?.();
}