import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const instanceOf = function <T extends NonNullable<object>>(this: Expect<T>, expected: any | Function | string) {
  if (typeof this.actual !== 'object') {
    throw new ExpectationError('instanceOf', this, {
      expected,
      actual: typeof this.actual
    });
  }
  if (typeof expected === 'string') {
    const name = this.actual.constructor.name;
    if (name !== expected) {
      throw new ExpectationError('instanceOf', this, {
        expected,
        actual: name
      });
    }
    return;
  }
  if (!(this.actual instanceof expected)) {
    throw new ExpectationError('instanceOf', this, {
      expected,
      actual: this.actual.constructor.name ?? this.actual
    });
  }
}