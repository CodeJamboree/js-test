import { Expect } from "./global";

export function and<T>(this: Expect<T>, actual: T): Expect<T> {
  this.actual = actual;
  return this;
}