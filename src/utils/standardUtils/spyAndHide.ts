import { skipWrite } from "./skipWrite.js";
import { spy } from "./spy.js";

export const spyAndHide = (state: MockStdoutState): void => {
  spy(state);
  skipWrite(state);
}
