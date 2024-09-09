import { logExpectationData } from "./logExpectationData.js";
import { expect } from "../expect/expect.js";
import { standardUtils } from "../utils/index.js";
import { ExpectationError } from "../expect/ExpectationError.js";

export const beforeEach = () => {
  standardUtils.spyAndHide();
}
export const afterEach = () => {
  standardUtils.restore();
}

export const withDetails = () => {
  logExpectationData(0, new ExpectationError('a', 'b', 'c', 'd'));
  expect(standardUtils.writes()).equals([
    "Actual: a\n",
    "Reason: b\n",
    "Expected: c\n",
    "Details: d\n"
  ]);
}

export const withoutDetails = () => {
  logExpectationData(0, new ExpectationError('a', 'b', 'c'));
  expect(standardUtils.writes()).equals([
    "Actual: a\n",
    "Reason: b\n",
    "Expected: c\n"
  ]);
}

export const withIndent = () => {
  logExpectationData(1, new ExpectationError('a', 'b', 'c', 'd'));
  expect(standardUtils.writes()).equals([
    "  Actual: a\n",
    "  Reason: b\n",
    "  Expected: c\n",
    "  Details: d\n"
  ]);
}

export const withObjects = () => {
  logExpectationData(0, new ExpectationError({ foo: 'bar' }, 'b', [1, 2, 3]));
  expect(standardUtils.writes()).equals([
    "Actual: { foo: \u001b[32m'bar'\u001b[39m }\n",
    "Reason: b\n",
    "Expected: [ \u001b[33m1\u001b[39m, \u001b[33m2\u001b[39m, \u001b[33m3\u001b[39m ]\n"
  ]);
}