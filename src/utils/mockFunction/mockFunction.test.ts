import { mockFunction } from "./mockFunction.js";
import { expect } from "../../expect/index.js";

export const wasCalled = () => {
  const foo = mockFunction();
  foo("a");
  expect(foo.called()).is(true);
}

export const callAt = () => {
  const foo = mockFunction();
  foo("a");
  foo("b");
  expect(foo.callAt(0)).equals(["a"]);
  expect(foo.callAt(1)).equals(["b"]);
}
export const callAtNegate = () => {
  const foo = mockFunction();
  foo("a");
  foo("b");
  expect(foo.callAt(-2)).equals(["a"]);
  expect(foo.callAt(-1)).equals(["b"]);
}
export const lastCallFirstArg = () => {
  const foo = mockFunction();
  foo("a");
  foo("b");
  expect(foo.callArg(-1, 0)).is("b");
}