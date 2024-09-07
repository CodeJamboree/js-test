import { setupWrite } from "./setupWrite.js";

export const skipWrite = (state: MockStdoutState): void => {
  state.allowWrite = false;
  setupWrite(state);
}