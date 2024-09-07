import { Entry, RunningState, TestSuite, TestSuites } from "./global.js";
import { logSuite } from "./log/logSuite.js";
import { runSuites } from "./runSuites.js";
import { runTests } from "./runTests.js";

export const runSuitesOrTests = async (entry: Entry<TestSuite | TestSuites>, state: RunningState) => {
  const [key, suite] = entry;
  logSuite(key, state);
  state.parents.push(key);
  if ('suites' in suite) {
    await runSuites(suite, state)
  } else {
    await runTests(suite, state);
  }
  state.parents.pop();
}