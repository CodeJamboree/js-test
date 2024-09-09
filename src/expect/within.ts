import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const within = function <T>(this: Expect<T>, min: T, max: T) {
  const match = this.actual >= min && this.actual <= max;
  if (this.negate) {
    if (match) throw new ExpectationError(this.actual, `within`, `${min} to ${max}`, this.details);
  } else if (!match)
    throw new ExpectationError(this.actual, `not within`, `${min} to ${max}`, this.details);
}