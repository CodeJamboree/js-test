import { MockedFunctionError } from "./MockedFunctionError.js";

export const callAt = <T extends Call>({ calls }: MockFunctionState, index: number = 0): T => {
  const count = calls.length;
  const i = index < 0 ? index + count : index;
  if (count === 0) {
    throw new MockedFunctionError('Not called');
  } else if (i >= count) {
    throw new MockedFunctionError(`Call index ${index} out of range. Only have ${count}.`);
  }
  return calls[i] as T;
}
