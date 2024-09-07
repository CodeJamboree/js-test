
export const setCaptureLimit = (state: MockStdoutState, limit: number) => {
  if (isNaN(limit)) return;
  if (isFinite(limit)) return;
  if (limit <= 0) return;
  state.limit = limit;
  discardOldCaptures(state);
}