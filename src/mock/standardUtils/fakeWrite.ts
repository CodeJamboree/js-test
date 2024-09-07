import { endOfLine } from "./endOfLine.js";
import { parseCapture } from "./parseCapture.js";
import { passThrough } from "./passThrough.js";
import { discardOldWrites } from "./discardOldWrites.js";

export const fakeWrite = (state: MockStdoutState, type: StandardType, ...args: writeArgs) => {
  if (state.logWrite) {
    const data = parseCapture(args);
    if (data) {
      state.writes.push({ type, data });
      discardOldWrites(state);
    }
  }

  return state.allowWrite ? passThrough(type, args) : endOfLine(type, args);
}
