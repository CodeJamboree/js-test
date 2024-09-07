export const clearCaptured = (state: MockStdoutState): void => {
  state.writes.length = 0;
}