import { isSkippedName } from "./isSkippedName.js";
import { expect } from "../expect/index.js";


export const skipped = () => {
  expect(isSkippedName('x_test')).is(true);
}
export const notSkipped = () => {
  expect(isSkippedName('test')).is(false);
}
export const focusNotSkipped = () => {
  expect(isSkippedName('f_test')).is(false);
}