import { endOfLine } from "./endOfLine.js";
import { parseCapture } from "./parseCapture.js";
import { passThrough } from "./passThrough.js";

export const onWrite = (state: MockStdoutState, ...args: writeArgs) => {
  const parsed = parseCapture(args);
  if (parsed) {
    state.captured.push(parsed);
    discardOldCaptures(state);
  }

  return state.showLogs ? passThrough(args) : endOfLine(args);
}
