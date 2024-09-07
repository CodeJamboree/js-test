import { equals } from './equals.js';
import { isFunction } from './isFunction.js';
import { is } from './is.js';
import { lengthOf } from './lengthOf.js';
import { startsWith } from './startsWith.js';
import { endsWith } from './endsWith.js';
import { includes } from './includes.js';
import { toThrow } from './toThrow.js';
import { instanceOf } from './instanceOf.js';
import { Expect } from './global.js';
import { and } from './and.js';

export const expect = <T>(actual: T, details?: any): Expect<T> => {
  return ({
    actual,
    details,
    equals,
    isFunction,
    is,
    lengthOf,
    startsWith,
    includes,
    endsWith,
    toThrow,
    instanceOf,
    and
  });
}
