import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const startsWith = function <T>(this: Expect<T>, expected: string) {
  if (typeof this.actual === 'string' && this.actual.startsWith(expected)) return;
  throw new ExpectationError(`starts with`, this, { expected });
}