import { Expect } from "./global.js";
import { ExpectationError } from "./ExpectationError.js";

export const toThrow = function <T extends Function>(this: Expect<T>, error?: Error | string) {
  const out = { thrown: false };
  tryThrowing(this, error, out);
  if (this.negate) {
    if (out.thrown)
      throw new ExpectationError(this.actual, `threw`, error ?? '', this.details);
  } else {
    if (!out.thrown)
      throw new ExpectationError(this.actual, `did not throw`, error ?? '', this.details);
  }
}

const tryThrowing = (expect: Expect<Function>, error: Error | string | undefined, out: { thrown: boolean }) => {
  out.thrown = false;
  try {
    expect.actual();
  } catch (actualError) {
    out.thrown = true;
    if (typeof error === 'undefined') return;
    if (error === actualError) return;
    if (typeof error === 'string') {
      if (actualError instanceof Error) {
        if (expect.negate && actualError.message === error) {
          const name = `[Function ${expect.actual.name ?? '(anonymous)'}]`;
          throw new ExpectationError(name, `threw`, error, expect.details);
        } else if (!expect.negate && actualError.message !== error) {
          throw new ExpectationError(actualError.message, `is not equal`, error, expect.details);
        }
        return;
      }
    }
    expect.and(actualError).equals(error);
  }
}