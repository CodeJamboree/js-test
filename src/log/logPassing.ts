import { RunningState, TestState } from "../global.js";
import { indent } from "./indent.js";

const prefix = 'pass: ';

export const logPassing = (testState: TestState, runningState: RunningState) => {
  const {
    name,
    index,
    siblings,
    parents: { length: depth }
  } = testState;
  if (runningState.excessTests <= 0) return;
  if (index < runningState.excessTests || index === siblings) {
    console.info(indent(depth, `${prefix}${name}`));
  } else if (index === runningState.excessTests) {
    console.debug(indent(depth, `${prefix}...`));
  }
}