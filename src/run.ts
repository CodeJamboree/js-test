import { getModules } from './loader/modules/getModules.js';
import { TestRunOptions, RunningState, Results, TestResult, TestState } from './global.js';
import { modulesAsTestSuites } from './loader/modulesAsTestSuites.js';
import { runSuites } from './runSuites.js';
import { logSummary } from './log/logSummary.js';

export const run = async ({
  testFilePattern = /\.test\.js$/,
  testFileReplacement,
  folderPath = 'src',
  excessTests = Infinity,
  beforeAll,
  beforeSuite,
  beforeEach,
  afterEach,
  afterSuite,
  afterAll,
  timeoutMs = Infinity,
  failFast = false,
  randomOrder = false
}: Partial<TestRunOptions>): Promise<Results> => {

  const state: RunningState = {
    parents: [],
    passed: 0,
    failed: 0,
    skipped: 0,
    total: 0,
    failures: [],
    hasFocused: false,
    excessTests,
    beforeAll,
    beforeEach,
    beforeSuite,
    afterSuite,
    afterAll,
    afterEach,
    timeoutMs,
    failFast,
    randomOrder
  };

  let modules = await getModules(folderPath, testFilePattern, testFileReplacement);
  if (!modules) {
    console.error('No tests found');
    return stateAsResults(state);
  }

  const testSuites = modulesAsTestSuites(state, modules, false);

  if (!testSuites) {
    if (state.skipped > 0) {
      console.log('All tests skipped', state.skipped);
    } else {
      console.error('No valid tests found.');
    }
    return stateAsResults(state);
  }

  await state.beforeAll?.();

  await runSuites(testSuites, state);

  await state.afterAll?.();

  logSummary(state);

  return stateAsResults(state);
}
const stateAsResults = ({
  passed, failed, skipped, total, failures
}: RunningState): Results => ({
  passed,
  failed,
  skipped,
  total,
  failures: failures.map(testStateAsTestResult)
});
const testStateAsTestResult = ({ name, error, filePath }: TestState): TestResult => ({
  name,
  error,
  filePath
});