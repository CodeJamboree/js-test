import { startCapture } from "./startCapture.js";
import { all } from "./all.js";
import { hideLogs } from "./hideLogs.js";
import { clearCaptured } from "./clearCaptured.js";
import { showLogs } from "./showLogs.js";
import { stopCapture } from "./stopCatpure.js";
import { setCaptureLimit } from "./setCaptureLimit.js";
import { at } from './at.js';

const state: MockStdoutState = {
  captured: [],
  showLogs: true,
  limit: 100
}

export const mockStdout = {
  setCaptureLimit: setCaptureLimit.bind(null, state),
  stopCapture: stopCapture.bind(null, state),
  startCapture: startCapture.bind(null, state),
  hideLogs: hideLogs.bind(null, state),
  showLogs: showLogs.bind(null, state),
  all: all.bind(null, state),
  at: at.bind(null, state),
  clearCaptured: clearCaptured.bind(null, state)
}