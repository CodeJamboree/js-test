import { expect } from "../../expect/index.js";
import { setValue } from "./setValue.js";
import { restore } from "./restore.js";

export const afterEach = () => {
  restore();
}

export const testValue = () => {
  setValue(.8675309);
  expect(Math.random()).is(.8675309)
  expect(Math.random()).is(.8675309)
}

export const aboveOne = () => {
  expect(() => {
    setValue(1.00000001);
  }).toThrow('Out of range. Expected 0 to 1');
}
export const belowZero = () => {
  expect(() => {
    setValue(-0.00000001);
  }).toThrow('Out of range. Expected 0 to 1');
}

export const zero = () => {
  setValue(0);
  const values = new Array(3)
    .fill(0)
    .map(() => Math.random());

  expect(values).equals([
    0, 0, 0
  ])
}
