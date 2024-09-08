import { processUtils } from "./processUtils.js";
import { standardUtils } from "../standardUtils/standardUtils.js";
import { expect } from "../../expect/expect.js";

const label = 'Start';

export const afterEach = () => {
  standardUtils.restore();
  processUtils.restore();
}
export const timePassesNormally = () => {
  standardUtils.spyAndHide();
  console.time(label);
  console.timeEnd(label);
  expect(standardUtils.writeAt(-1)).not().equals(`${label}: 0s\n`);
  expect(standardUtils.writeAt(-1)).startsWith(`${label}: 0.`);
  expect(standardUtils.writeAt(-1)).endsWith('ms\n');
}
export const timeFrozen = () => {
  standardUtils.spyAndHide();
  processUtils.freeze();
  console.time(label);
  console.timeEnd(label);
  expect(standardUtils.writeAt(-1)).equals(`${label}: 0ms\n`);
}
export const oneNanoSecond = () => {
  standardUtils.spyAndHide();
  processUtils.set([1.000, 0]);
  console.time(label);
  processUtils.set([1.000, 1]);
  console.timeEnd(label);
  expect(standardUtils.writeAt(-1)).equals(`${label}: 0ms\n`);
}
export const oneMicrosecond = () => {
  standardUtils.spyAndHide();
  processUtils.set([1.000, 0]);
  console.time(label);
  processUtils.set([1.000, 1000]);
  console.timeEnd(label);
  expect(standardUtils.writeAt(-1)).equals(`${label}: 0.001ms\n`);
}
export const oneMillisecond = () => {
  standardUtils.spyAndHide();
  processUtils.set([1.000, 0]);
  console.time(label);
  processUtils.set([1.001, 0]);
  console.timeEnd(label);
  expect(standardUtils.writeAt(-1)).equals(`${label}: 1ms\n`);
}