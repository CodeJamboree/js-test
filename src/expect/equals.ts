import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";
import { serialize } from "./serialize.js";

export const equals = function <T>(this: Expect<T>, expected: T) {
  if (this.actual === expected) return;
  const a = serialize(this.actual);
  const e = serialize(expected);
  if (a !== e) {
    throw new ExpectationError(`equal`, this, { actual: a, expected: e });
  }
}