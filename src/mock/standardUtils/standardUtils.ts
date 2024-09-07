import { spy } from "./spy.js";
import { writes } from "./writes.js";
import { skipWrite } from "./skipWrite.js";
import { clearCaptured } from "./clearCaptured.js";
import { allowWrite } from "./allowWrite.js";
import { unspy } from "./unspy.js";
import { setCaptureLimit } from "./setCaptureLimit.js";
import { writeAt } from './writeAt.js';
import { spyAndHide } from "./spyAndHide.js";
import { restore } from "./restore.js";
import { typeAt } from "./typeAt.js";

const state: MockStdoutState = {
  writes: [],
  allowWrite: true,
  logWrite: false,
  limit: 100
}

export const standardUtils = {
  setCaptureLimit: setCaptureLimit.bind(null, state),
  unspy: unspy.bind(null, state),
  spy: spy.bind(null, state),
  skipWrite: skipWrite.bind(null, state),
  allowWrite: allowWrite.bind(null, state),
  writes: writes.bind(null, state),
  writeAt: writeAt.bind(null, state),
  typeAt: typeAt.bind(null, state),
  clearCaptured: clearCaptured.bind(null, state),
  spyAndHide: spyAndHide.bind(null, state),
  restore: restore.bind(null, state)
}