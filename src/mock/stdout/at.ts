export const at = (state: MockStdoutState, index: number): Capture => {
  const count = state.captured.length;
  const i = index < 0 ? count + index : index;
  if (i >= state.captured.length) {
    throw new Error(`Out of range ${i} (${index}). Max ${state.captured.length}`);
  }
  return state.captured[i];
}