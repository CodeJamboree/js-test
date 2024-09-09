import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const startsWith = function <T>(this: Expect<T>, expected: string) {
  const match = typeof this.actual === 'string' && this.actual.startsWith(expected);
  if (this.negate) {
    if (match) throw new ExpectationError(this.actual, `starts with`, expected, this.details);
  } else if (!match) {
    throw new ExpectationError(this.actual, `does not start with`, expected, this.details);
  }
}