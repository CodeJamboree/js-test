import { Expect } from "../global.js";
import { ExpectationError } from "./ExpectationError.js";
import { expect } from './index.js';

export const toThrow = function <T extends Function>(this: Expect<T>, error?: Error | string) {
  try {
    this.actual();
  } catch (e) {
    if (typeof error === 'undefined') return;
    if (error === e) return;
    if (typeof error === 'string') {
      if (e instanceof Error) {
        if (e.message === error) return;
        throw new ExpectationError(`throws`, this, { expected: error });
      }
    }
    expect(e, this.details).equals(error);
    return;
  }
  throw new ExpectationError(`throws`, this, { expected: error });
}