import { allowWrite } from "./allowWrite.js";
import { clearCaptured } from "./clearCaptured.js";
import { unspy } from "./unspy.js";

export const restore = (state: MockStdoutState): void => {
  unspy(state);
  allowWrite(state);
  clearCaptured(state);
}
