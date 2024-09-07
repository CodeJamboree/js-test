import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const within = function <T>(this: Expect<T>, min: T, max: T) {
  const match = this.actual >= min && this.actual <= max;
  if (this.negate) {
    if (match) throw new ExpectationError(`not within`, this, { min, max });
  } else if (!match)
    throw new ExpectationError(`within`, this, { min, max });
}