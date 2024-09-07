export const clearCaptured = (state: MockStdoutState): void => {
  state.captured.length = 0;
}