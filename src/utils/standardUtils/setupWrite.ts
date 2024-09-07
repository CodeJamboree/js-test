import { fakeWrite } from "./fakeWrite.js";
import { standardOutWrite } from './standardOutWrite.js';
import { standardErrorWrite } from './standardErrorWrite.js';

export const setupWrite = (state: MockStdoutState) => {
  if (!state.allowWrite || state.logWrite) {
    process.stdout.write = fakeWrite.bind(null, state, 'standard');
    process.stderr.write = fakeWrite.bind(null, state, 'error');
  } else {
    process.stdout.write = standardOutWrite;
    process.stderr.write = standardErrorWrite;
  }

}