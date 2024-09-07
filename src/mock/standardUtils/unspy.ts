import { setupWrite } from "./setupWrite.js";

export const unspy = (state: MockStdoutState) => {
  state.logWrite = false;
  setupWrite(state);
};
