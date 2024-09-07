import { RunningState, TestInfo } from "../global.js";
import { indent } from "./indent.js";

const prefix = 'pass: ';

export const logPassing = (test: TestInfo, state: RunningState) => {
  const {
    name,
    index,
    siblings,
    parents: { length: depth }
  } = test;
  if (state.excessTests <= 0) return;
  if (index < state.excessTests || index === siblings) {
    console.info(indent(depth, `${prefix}${name}`));
  } else if (index === state.excessTests) {
    console.debug(indent(depth, `${prefix}...`));
  }
}