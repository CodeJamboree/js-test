import { MockedFunctionError } from "./MockedFunctionError.js";
import { callAt } from './callAt.js';

export const callArg = <T>(state: MockFunctionState, callIndex: number = 0, argIndex: number = 0): T => {
  const args = callAt(state, callIndex);
  const count = args.length;
  const i = argIndex < 0 ? argIndex + count : argIndex;
  if (count === 0) {
    throw new MockedFunctionError('No arguments');
  } else if (i >= count) {
    throw new MockedFunctionError(`Argument index ${argIndex} out of range. Only have ${count}.`);
  }
  return args[i] as T;
}
