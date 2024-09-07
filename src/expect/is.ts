import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const is = function <T>(this: Expect<T>, expected: T) {
  if (this.negate) {
    if (this.actual !== expected) return;
    throw new ExpectationError(`is not`, this, { expected });
  } else {
    if (this.actual === expected) return;
    throw new ExpectationError(`is`, this, { expected });
  }
}