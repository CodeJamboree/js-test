import { ModuleList } from "./modules/getModules.js";
import { RunningState, SuiteInfo, SuiteOrSuites, TestSuites } from "../global.js";
import { isFocusedName } from "./isFocusedName.js";
import { isModule } from "./modules/isModule.js";
import { isSkippedName } from "./isSkippedName.js";
import { moduleAsTests } from "./moduleAsTests.js";

export const modulesAsTestSuites = (state: RunningState, moduleOrList: ModuleList, skip: boolean): TestSuites | undefined => {
  const entries = Object.entries(moduleOrList);

  let focused = false;
  let suites: [string, SuiteOrSuites][] = [];

  for (let i = 0; i < entries.length; i++) {

    const [key, target] = entries[i];

    const skipItem = skip || isSkippedName(key);

    const item = isModule(target) ?
      moduleAsTests(state, target, skipItem) :
      modulesAsTestSuites(state, target, skipItem);

    if (!item) continue;

    if (isFocusedName(key)) item.focused = true;
    if (item.focused) focused = true;
    suites.push([key, item])
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

  return {
    focused,
    runnable,
    suites
  };
}
const sumRunnable = (sum: number, [_, { runnable }]: [PropertyKey, SuiteInfo]) => sum + runnable;
const isFocused = ([_, { focused }]: [PropertyKey, SuiteInfo]) => focused;