import { indent } from "./indent.js";
import { expect } from "../expect/index.js";

export const zero = () => {
  expect(
    indent(0, 'the test')
  ).is('the test')
}
export const one = () => {
  expect(
    indent(1, 'the test')
  ).is('  the test')
}
export const two = () => {
  expect(
    indent(2, 'the test')
  ).is('    the test')
}