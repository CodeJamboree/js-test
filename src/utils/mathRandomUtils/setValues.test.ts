import { expect } from "../../expect/index.js";
import { setValues } from "./setValues.js";
import { restore } from "./restore.js";

export const afterEach = () => {
  restore();
}

export const valuesWrap = () => {
  setValues([0.1, 0.2, 0.3]);
  const values = new Array(9)
    .fill(0)
    .map(() => Math.random());

  expect(values).equals([
    0.1, 0.2, 0.3,
    0.1, 0.2, 0.3,
    0.1, 0.2, 0.3
  ]);
}
export const aboveOne = () => {
  expect(() => {
    setValues([1.00000001, 1.00000001]);
  }).toThrow('Out of range. Expected 0 to 1')
}
export const belowZero = () => {
  expect(() => {
    setValues([-0.00000001, -0.00000001]);
  }).toThrow('Out of range. Expected 0 to 1')
}
export const empty = () => {
  expect(() => {
    setValues([]);
  }).toThrow('Must have more than one value')
}

export const oneValue = () => {
  expect(() => {
    setValues([0]);
  }).toThrow(Error('Must have more than one value'))

}
