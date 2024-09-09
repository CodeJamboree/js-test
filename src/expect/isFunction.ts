import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const isFunction = function <T>(this: Expect<T>) {
  let isFunc = false;
  let name: string = typeof this.actual;
  if (typeof this.actual === 'function') {
    isFunc = true;
    name = '[Function: (anonymous)]';
    if ('name' in this.actual && this.actual.name.trim() !== '')
      name = `[Function: ${this.actual.name}]`;
  }
  if (this.negate && isFunc) {
    throw new ExpectationError(name, `is a`, 'function', this.details);
  } else if (!this.negate && !isFunc) {
    throw new ExpectationError(name, `is not a`, 'function', this.details);
  }
}