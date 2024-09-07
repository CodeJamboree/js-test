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
import { not } from './not.js';
import { above } from './above.js';
import { below } from './below.js';
import { within } from './within.js';

export const expect = <T>(actual: T, details?: any): Expect<T> => {
  return ({
    actual,
    details,
    negate: false,
    equals,
    isFunction,
    is,
    not,
    above,
    below,
    within,
    lengthOf,
    startsWith,
    includes,
    endsWith,
    toThrow,
    instanceOf,
    and
  });
}
