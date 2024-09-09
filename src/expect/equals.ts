import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";
import { serialize } from "./serialize.js";

export const equals = function <T>(this: Expect<T>, expected: T) {
  if (this.negate) {
    if (this.actual === expected) {
      throw new ExpectationError(this.actual, `equals`, expected, this.details);
    };
    const a = serialize(this.actual);
    const e = serialize(expected);
    if (a === e) {
      throw new ExpectationError(a, `equals`, e, this.details);
    }
  } else {
    if (this.actual === expected) return;
    const a = serialize(this.actual);
    const e = serialize(expected);
    if (a !== e) {
      throw new ExpectationError(a, `not equal to`, e, this.details);
    }
  }
}
