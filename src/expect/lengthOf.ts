import { Expect } from "../global.js";
import { ExpectationError } from "./ExpectationError.js";

export const lengthOf = function <T>(this: Expect<T>, expected: number) {
  let length: any = undefined;
  switch (typeof this.actual) {
    case 'object':
      if (this.actual === null) {
        length = 'invalid (null)';
      } else if ('length' in this.actual) {
        length = this.actual;
      } else {
        length = 'invalid key';
      }
      break;
    case 'function':
      if ('length' in this.actual) {
        length = this.actual;
      } else {
        length = 'invalid key';
      }
      break;
    case 'string':
      length = this.actual.length;
      break;
    case 'undefined':
    case 'number':
    case 'boolean':
    default:
      length = `invalid (${typeof this.actual})`;
      break;
  }
  if (length === expected) return;
  throw new ExpectationError(`length`, this, { expected, actual: length });
}