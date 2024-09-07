import { Expect } from "../global.js";
import { ExpectationError } from "./ExpectationError.js";

export const includes = function <T extends string>(this: Expect<T>, expected: string) {
  if (typeof this.actual === 'string' && this.actual.includes(expected)) return;
  if (Array.isArray(this.actual) && this.actual.includes(expected)) return;
  throw new ExpectationError(`ends with`, this, { expected });
}