import { Expect } from "../global.js";
import { ExpectationError } from "./ExpectationError.js";

export const isFunction = function <T>(this: Expect<T>, expected: boolean = true) {
  if ((typeof this.actual === 'function') === expected) return;
  throw new ExpectationError(`function`, this, { expected });
}