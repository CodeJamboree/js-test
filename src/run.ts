import { getModules } from './loader/modules/getModules.js';
import { TestRunOptions, RunningState } from './global.js';
import { modulesAsTestSuites } from './loader/modulesAsTestSuites.js';
import { runSuites } from './runSuites.js';
import { logSummary } from './log/logSummary.js';

export const run = async ({
  testFilePattern = /\.test\.js$/,
  testFileReplacement,
  folderPath = 'build/src',
  excessTests = Infinity,
  beforeAll,
  beforeSuite,
  beforeEach,
  afterEach,
  afterSuite,
  afterAll,
  timeoutMs = 5000
}: Partial<TestRunOptions>) => {

  let modules = await getModules(folderPath, testFilePattern, testFileReplacement);
  if (!modules) {
    console.error('No tests found');
    return;
  }
  const state: RunningState = {
    parents: [],
    passed: 0,
    failed: 0,
    skipped: 0,
    failures: [],
    hasFocused: false,
    excessTests,
    beforeAll,
    beforeEach,
    beforeSuite,
    afterSuite,
    afterAll,
    afterEach,
    timeoutMs
  }
  const testSuites = modulesAsTestSuites(state, modules, false);

  if (!testSuites) {
    if (state.skipped > 0) {
      console.log('All tests skipped', state.skipped);
    } else {
      console.error('No valid tests found.');
    }
    return;
  }

  await state.beforeAll?.();

  await runSuites(testSuites, state);

  await state.afterAll?.();

  logSummary(state);
}
