import { expect } from "./expect.js";

export const equalAndSameObject = () => {
  const o = { foo: 'bar' };
  expect(o).equals(o);
}

export const equalDifferentObjects = () => {
  const a = { foo: 'bar' };
  const b = { foo: 'bar' };
  expect(a).equals(b);
}

export const throwWhenNotEqual = () => {
  const a = { foo: 'bar' };
  const b = { bar: 'foo' };
  expect(() => {
    expect(a).equals(b);
  }).toThrow();
}

export const negatePassedWhenDifferent = () => {
  const a = { foo: 'bar' };
  const b = { bar: 'foo' };
  expect(a).not().equals(b);
}
export const negateThrowsWhenEqual = () => {
  const a = { foo: 'bar' };
  const b = { foo: 'bar' };
  expect(() => {
    expect(a).not().equals(b);
  }).toThrow();
}