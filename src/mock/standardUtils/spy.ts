import { setupWrite } from "./setupWrite.js";

export const spy = (state: MockStdoutState): void => {
  state.logWrite = true;
  setupWrite(state);
}
