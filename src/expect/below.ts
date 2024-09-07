import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const below = function <T>(this: Expect<T>, expected: T) {
  if (this.negate) {
    if (this.actual >= expected) return;
    throw new ExpectationError(`not below`, this, { expected });
  } else {
    if (this.actual < expected) return;
    throw new ExpectationError(`below`, this, { expected });
  }
}