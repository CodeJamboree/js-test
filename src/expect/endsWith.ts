import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const endsWith = function <T extends string>(this: Expect<T>, expected: string) {
  if (this.negate) {
    if (typeof this.actual === 'string' && !this.actual.endsWith(expected)) return;
    throw new ExpectationError(this.actual, `ends with`, expected, this.details);
  } else {
    if (typeof this.actual === 'string' && this.actual.endsWith(expected)) return;
    throw new ExpectationError(this.actual, `not ending with`, expected, this.details);
  }
}