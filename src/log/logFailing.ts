
import { ExpectationError } from "../expect/ExpectationError.js";
import { RunningState, TestInfo } from "../global.js";
import { indent } from "./indent.js";
import { logExpectationData } from "./logExpectationData.js";

export const logFailing = (info: TestInfo, state: RunningState) => {
  const {
    name,
    error,
    parents: { length: depth }
  } = info;
  console.error(indent(depth, `fail: ${name} ${error}`));
  if (!(error instanceof Error)) return;
  if ((error instanceof ExpectationError) && error.data) {
    logExpectationData(error.data);
  }
  console.debug(error.stack);
}