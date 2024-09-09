import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const is = function <T>(this: Expect<T>, expected: T) {
  if (this.negate) {
    if (this.actual !== expected) return;
    throw new ExpectationError(this.actual, `is not`, expected, this.details);
  } else {
    if (this.actual === expected) return;
    throw new ExpectationError(this.actual, `is`, expected, this.details);
  }
}