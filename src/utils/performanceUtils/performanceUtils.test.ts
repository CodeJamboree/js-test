import { performanceUtils } from "./performanceUtils.js";
import { expect } from "../../expect/index.js";

export const afterEach = () => {
  performanceUtils.restore();
}
export const timePassesNormally = () => {
  const now1 = performance.now();
  const now2 = performance.now();
  expect(now1).not().equals(now2);
}
export const timeFrozen = () => {
  performanceUtils.freeze();
  const now1 = performance.now();
  const now2 = performance.now();
  expect(now1).is(now2);
}
export const timeRestored = () => {
  performanceUtils.freeze();
  const now1 = performance.now();
  performanceUtils.restore();
  const now2 = performance.now();
  expect(now1).not().equals(now2);
}
export const timeSet = () => {
  performanceUtils.set(8675309);
  const now1 = performance.now();
  expect(now1).is(8675309);
}