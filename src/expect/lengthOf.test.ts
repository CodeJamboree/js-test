import { expect } from "./expect.js";

export const lengthEqual = () => {
  expect([]).lengthOf(0);
}
export const lengthEqualFailure = () => {
  expect(() => {
    expect([]).lengthOf(1);
  }).toThrow();
}
export const lengthNotEqual = () => {
  expect([1]).not().lengthOf(0);
}

export const lengthNotEqualFailure = () => {
  expect(() => {
    expect([]).not().lengthOf(0);
  }).toThrow();
}