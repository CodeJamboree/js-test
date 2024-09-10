import { expect } from "../expect/expect.js"
import { TestFunction } from "../global.js";

export const testCaseTest: TestFunction = (firstAddend: number, secondAddend: number, sum: number) => {
  expect(firstAddend + secondAddend).is(sum);
}

testCaseTest.testCases = [
  [37, 5, 42],
  [51, 75, 126],
  [22, 27, 49],
  [32, 56, 88],
  [83, 12, 95]
];

let _before = 0;
export const testBefore = (newNum: number) => {
  expect(_before).is(10);
  _before = newNum;
}
testBefore.before = () => { _before = 10; }
testBefore.testCases = [
  [1], [4], [7], [10]
];

let _after = 0;
let _afterFirst = true;
export const testAfter = (newNum: number) => {
  if (_afterFirst)
    expect(_after).is(0);
  else
    expect(_after).is(10);
  _afterFirst = false;
  _after = newNum;
}
testAfter.after = () => { _after = 10; }
testAfter.testCases = [
  [1], [4], [7], [10]
];