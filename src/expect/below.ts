import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const below = function <T>(this: Expect<T>, expected: T) {
  if (this.negate) {
    if (this.actual >= expected) return;
    throw new ExpectationError(this.actual, `below`, expected, this.details);
  } else {
    if (this.actual < expected) return;
    throw new ExpectationError(this.actual, `not below`, expected, this.details);
  }
}