import { setupWrite } from "./setupWrite.js";

export const allowWrite = (state: MockStdoutState): void => {
  state.allowWrite = true;
  setupWrite(state);
}