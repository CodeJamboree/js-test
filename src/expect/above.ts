import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const above = function <T>(this: Expect<T>, expected: T) {
  if (this.negate) {
    if (this.actual <= expected) return;
    throw new ExpectationError(`not above`, this, { expected });
  } else {
    if (this.actual > expected) return;
    throw new ExpectationError(`above`, this, { expected });
  }
}