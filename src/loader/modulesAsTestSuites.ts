import { ModuleList } from "./modules/getModules.js";
import { RunningState, SuiteInfo, TestSuites, TestSuite } from "../global.js";
import { isFocusedName } from "./isFocusedName.js";
import { isModule } from "./modules/isModule.js";
import { isSkippedName } from "./isSkippedName.js";
import { moduleAsTests } from "./moduleAsTests.js";
import { sortRandomly } from "./sortRandomly.js";

export const modulesAsTestSuites = (state: RunningState, moduleOrList: ModuleList, skip: boolean): TestSuites | undefined => {
  const entries = Object.entries(moduleOrList);

  let focused = false;
  let suites: [string, TestSuite][] = [];

  const addSuite = (key: string, name?: string, suite?: TestSuite) => {
    if (!suite) return;
    focused ||= isFocusedName(key) || (suite.focused ?? false);
    if (!focused && name) focused = isFocusedName(name);
    let finalName = name ? `${key} / ${name}` : key;
    suites.push([finalName, suite])
  }

  for (let i = 0; i < entries.length; i++) {

    const [key, target] = entries[i];

    const skipItem = skip || isSkippedName(key);

    if (isModule(target)) {
      addSuite(key, '', moduleAsTests(state, target, skipItem));
    } else {
      const testSuites = modulesAsTestSuites(state, target, skipItem);
      testSuites?.suites.forEach(([name, suite]) => {
        addSuite(key, name, suite);
      });
    }
  }

  if (focused) {
    suites.forEach(([_key, suite]) => {
      if (!suite.focused) {
        state.skipped += suite.runnable;
      }
    })
    suites = suites.filter(isFocused);
  }

  const runnable = suites.reduce(sumRunnable, 0);
  if (runnable === 0) return;

  if (state.randomOrder) {
    sortRandomly(suites);
  }

  return {
    focused,
    runnable,
    suites
  };
}
const sumRunnable = (sum: number, [_, { runnable }]: [PropertyKey, SuiteInfo]) => sum + runnable;
const isFocused = ([_, { focused }]: [PropertyKey, SuiteInfo]) => focused;