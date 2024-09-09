import { RunningState } from "../global.js";
import { indent } from "./indent.js";

export const logSuite = (key: string, state: RunningState) => {
  const {
    parents: { length: depth }
  } = state;
  console.debug(indent(depth, key));
}
