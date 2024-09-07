import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const instanceOf = function <T extends NonNullable<object>>(this: Expect<T>, expected: any | Function | string) {
  if (typeof this.actual !== 'object') {
    if (this.negate) {
      return;
    } else {
      throw new ExpectationError('instanceOf', this, {
        expected,
        actual: typeof this.actual
      });
    }
  }
  if (typeof expected === 'string') {
    const name = this.actual.constructor.name;
    if (this.negate) {
      if (name === expected) {
        throw new ExpectationError('not instanceOf', this, {
          expected,
          actual: name
        });
      }
    } else {
      if (name !== expected) {
        throw new ExpectationError('instanceOf', this, {
          expected,
          actual: name
        });
      }
    }
    return;
  }
  if (this.negate) {
    if (this.actual instanceof expected) {
      throw new ExpectationError('not instanceOf', this, {
        expected,
        actual: this.actual.constructor.name ?? this.actual
      });
    }
  } else {
    if (!(this.actual instanceof expected)) {
      throw new ExpectationError('instanceOf', this, {
        expected,
        actual: this.actual.constructor.name ?? this.actual
      });
    }
  }
}