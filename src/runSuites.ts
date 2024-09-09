import { RunningState, TestSuites } from "./global.js";
import { runSuitesOrTests } from "./runSuitesOrTests.js";

export const runSuites = async ({ suites }: TestSuites, state: RunningState) => {
  const count = suites.length;
  for (let i = 0; i < count; i++) {
    await runSuitesOrTests(suites[i], state, runSuites);
    if (state.failFast && state.failed > 0) break;
  }
}
