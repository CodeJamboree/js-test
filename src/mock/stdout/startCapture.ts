import { onWrite } from "./onWrite.js";

export const startCapture = (state: MockStdoutState): void => {
  process.stdout.write = onWrite.bind(null, state);
}
