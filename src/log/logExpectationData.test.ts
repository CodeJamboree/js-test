import { logExpectationData } from "./logExpectationData.js";
import { expect } from "../expect/index.js";
import { mockStdout } from "../mock/index.js";

export const beforeEach = () => {
  mockStdout.clearCaptured();
  mockStdout.hideLogs();
  mockStdout.startCapture();
}
export const afterEach = () => {
  mockStdout.showLogs();
  mockStdout.stopCapture();
}

export const expected = () => {
  logExpectationData({ 'expected': 'the value' });
  expect(mockStdout.at(-1)).is('Expected: the value\n');
}
export const expectedValue = () => {
  logExpectationData({ 'expectedValue': 'the value' });
  expect(mockStdout.at(-1)).is('Expected: the value\n');
}
export const actual = () => {
  logExpectationData({ 'actual': 'the value' });
  expect(mockStdout.at(-1)).is('Actual: the value\n');
}
export const actualValue = () => {
  logExpectationData({ 'actualValue': 'the value' });
  expect(mockStdout.at(-1)).is('Actual: the value\n');
}
export const details = () => {
  logExpectationData({ 'details': 'the value' });
  expect(mockStdout.at(-1)).is('Details: the value\n');
}
export const unexpectedKey = () => {
  logExpectationData({ 'anythingYouWantHere': 'the value' });
  expect(mockStdout.at(-1)).is('anythingYouWantHere: the value\n');
}
