
import { ExpectationError } from "../expect/ExpectationError.js";
import { RunningState, TestState } from "../global.js";
import { indent } from "./indent.js";
import { logExpectationData } from "./logExpectationData.js";

export const logFailing = (testState: TestState, _runningState: RunningState) => {
  const {
    filePath,
    name,
    error,
    parents: { length: depth }
  } = testState;
  console.error(indent(depth, `fail: ${name} ${error}`));
  console.log(indent(depth + 1, filePath));
  if (!(error instanceof Error)) return;

  if ((error instanceof ExpectationError)) {
    logExpectationData(depth + 1, error);
    return;
  }
  const maxLength = 160;
  error.stack?.split('\n').forEach(line => {
    if (line.length > maxLength) {
      console.debug(`${line.substring(0, maxLength - 3)}...`);
    } else {
      console.debug(line);
    }
  })
}