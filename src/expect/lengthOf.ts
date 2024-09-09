import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const lengthOf = function <T>(this: Expect<T>, expected: number) {
  const length = parseLength(this.actual);
  if (this.negate) {
    if (length === expected)
      throw new ExpectationError(length, 'length equals', expected, this.details);
  } else if (length !== expected) {
    throw new ExpectationError(length, `not length equal to`, expected, this.details);
  }
}

const parseLength = <T>(target: T) => {
  let length: any = undefined;
  switch (typeof target) {
    case 'object':
      if (target === null) {
        length = 'invalid (null)';
      } else if ('length' in target) {
        length = target;
      } else {
        length = 'invalid key';
      }
      break;
    case 'function':
      if ('length' in target) {
        length = target;
      } else {
        length = 'invalid key';
      }
      break;
    case 'string':
      length = target.length;
      break;
    case 'undefined':
    case 'number':
    case 'boolean':
    default:
      length = `invalid (${typeof target})`;
      break;
  }
  return length;
}