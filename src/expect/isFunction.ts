import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const isFunction = function <T>(this: Expect<T>) {
  if (this.negate) {
    if (typeof this.actual !== 'function') return;
    throw new ExpectationError(`not function`, this);
  } else {
    if (typeof this.actual === 'function') return;
    throw new ExpectationError(`function`, this);
  }
}