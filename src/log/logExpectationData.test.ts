import { logExpectationData } from "./logExpectationData.js";
import { expect } from "../expect/expect.js";
import { standardUtils } from "../utils/index.js";

export const beforeEach = () => {
  standardUtils.spyAndHide();
}
export const afterEach = () => {
  standardUtils.restore();
}

export const expected = () => {
  logExpectationData({ 'expected': 'the value' });
  expect(standardUtils.writeAt(-1)).is('Expected: the value\n');
}
export const expectedValue = () => {
  logExpectationData({ 'expectedValue': 'the value' });
  expect(standardUtils.writeAt(-1)).is('Expected: the value\n');
}
export const actual = () => {
  logExpectationData({ 'actual': 'the value' });
  expect(standardUtils.writeAt(-1)).is('Actual: the value\n');
}
export const actualValue = () => {
  logExpectationData({ 'actualValue': 'the value' });
  expect(standardUtils.writeAt(-1)).is('Actual: the value\n');
}
export const details = () => {
  logExpectationData({ 'details': 'the value' });
  expect(standardUtils.writeAt(-1)).is('Details: the value\n');
}
export const unexpectedKey = () => {
  logExpectationData({ 'anythingYouWantHere': 'the value' });
  expect(standardUtils.writeAt(-1)).is('anythingYouWantHere: the value\n');
}
