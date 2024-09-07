// const original = {
//   now: performance.now.bind(performance),
//   hrtime: process.hrtime.bind(process)
// };

import { freeze } from "./freeze.js";
import { set } from "./set.js";
import { restore } from "./restore.js";

export const performanceUtils = {
  freeze,
  set,
  restore
}
