import { clearCaptured } from "./clearCaptured.js";
import { write } from "./write.js";

export const stopCapture = (state: MockStdoutState) => {
  process.stdout.write = write;
  clearCaptured(state);
};
