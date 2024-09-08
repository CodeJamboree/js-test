import { expect } from "../../expect/expect.js";
import { setFunction } from "./setFunction.js";
import { restore } from "./restore.js";

export const afterEach = () => {
  restore();
}

export const testValue = () => {
  let base = 0.3;
  setFunction(() => base + 0.4);
  expect(Math.random()).is(0.7);
  base = 0.1;
  expect(Math.random()).is(0.5)
}
