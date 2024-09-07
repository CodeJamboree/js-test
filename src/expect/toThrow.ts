import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

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
    this.and(e).equals(error);
    return;
  }
  throw new ExpectationError(`throws`, this, { expected: error });
}