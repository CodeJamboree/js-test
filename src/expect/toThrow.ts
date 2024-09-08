import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const toThrow = function <T extends Function>(this: Expect<T>, error?: Error | string) {
  const out = { thrown: false };
  tryThrowing(this, error, out);
  if (this.negate) {
    if (out.thrown)
      throw new ExpectationError(`not throws`, this, { expected: error });
  } else {
    if (!out.thrown)
      throw new ExpectationError(`throws`, this, { expected: error });
  }
}

const tryThrowing = (expect: Expect<Function>, error: Error | string | undefined, out: { thrown: boolean }) => {
  out.thrown = false;
  try {
    expect.actual();
  } catch (e) {
    out.thrown = true;
    if (typeof error === 'undefined') return;
    if (error === e) return;
    if (typeof error === 'string') {
      if (e instanceof Error) {
        if (e.message === error) return;
        if (expect.negate) {
          throw new ExpectationError(`not throws`, expect, { actual: e.message, expected: error });
        } else {
          throw new ExpectationError(`throws`, expect, { actual: e.message, expected: error });
        }
      }
    }
    expect.and(e).equals(error);
  }
}