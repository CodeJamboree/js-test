import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const above = function <T>(this: Expect<T>, expected: T) {
  if (this.negate) {
    if (this.actual <= expected) return;
    throw new ExpectationError(this.actual, `above`, expected, this.details);
  } else {
    if (this.actual > expected) return;
    throw new ExpectationError(this.actual, `not above`, expected, this.details);
  }
}