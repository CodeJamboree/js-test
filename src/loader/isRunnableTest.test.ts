import { isRunnableTest } from "./isRunnableTest.js";
import { expect } from "../expect/index.js";

const noop = () => { };

export const isRunnable = () => {
  expect(
    isRunnableTest(['test1', noop], 0, [])
  ).is(true);
}
export const isNotFunction = () => {
  expect(
    isRunnableTest(['test1', 'not a function'], 0, [])
  ).is(false);
}
export const isBeforeAll = () => {
  expect(
    isRunnableTest(['beforeAll', noop], 0, [])
  ).is(false);
}
export const isAfterAll = () => {
  expect(
    isRunnableTest(['afterAll', noop], 0, [])
  ).is(false);
}
export const isBeforeEach = () => {
  expect(
    isRunnableTest(['beforeEach', noop], 0, [])
  ).is(false);
}
export const isAfterEach = () => {
  expect(
    isRunnableTest(['afterEach', noop], 0, [])
  ).is(false);
}
export const isSkipped = () => {
  expect(
    isRunnableTest(['x_test2', noop], 0, [])
  ).is(false);
}
export const isFocused = () => {
  const test1 = ['f_test1', noop] as [string, Function];
  const test2 = ['test2', noop] as [string, Function];
  expect(
    isRunnableTest(test1, 0, [test1, test2])
  ).is(true);
}
export const isNormalWithOtherFocused = () => {
  const test1 = ['test1', noop] as [string, Function];
  const test2 = ['f_test2', noop] as [string, Function];
  expect(
    isRunnableTest(test1, 0, [test1, test2])
  ).is(false);
}
export const isFocusedWithOtherFocused = () => {
  const test1 = ['f_test1', noop] as [string, Function];
  const test2 = ['f_test2', noop] as [string, Function];
  expect(
    isRunnableTest(test1, 0, [test1, test2])
  ).is(true);
}