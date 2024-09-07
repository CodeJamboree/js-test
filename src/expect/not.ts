import { Expect } from "./global";

export function not<T>(this: Expect<T>): Expect<T> {
  this.negate = !this.negate;
  return this;
}