import { indent } from "./indent.js";
import { expect } from "../expect/expect.js";

export const noIndent = () => {
  expect(
    indent(0, 'the test')
  ).is('the test')
}
export const one = () => {
  expect(
    indent(1, 'the test')
  ).is('  the test')
}
export const indentTwo = () => {
  expect(
    indent(2, 'the test')
  ).is('    the test')
}