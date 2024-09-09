import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const instanceOf = function <T extends NonNullable<object>>(this: Expect<T>, expected: any | Function | string) {
  if (typeof this.actual !== 'object') {
    if (this.negate) {
      return;
    } else {
      throw new ExpectationError(typeof this.actual, `not instance`, expected, this.details);
    }
  }
  const name = this.actual.constructor.name;
  if (typeof expected === 'string') {
    if (this.negate) {
      if (name === expected) {
        throw new ExpectationError(name, `instance of`, expected, this.details);
      }
    } else {
      if (name !== expected) {
        throw new ExpectationError(name, `not instance of`, expected, this.details);
      }
    }
    return;
  }
  if (this.negate) {
    if (this.actual instanceof expected) {
      throw new ExpectationError(name, `instance of`, expected, this.details);
    }
  } else {
    if (!(this.actual instanceof expected)) {
      throw new ExpectationError(name, `not instance of`, expected, this.details);
    }
  }
}