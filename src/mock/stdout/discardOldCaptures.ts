
export const discardOldCaptures = (state: MockStdoutState) => {
  const { limit, captured } = state;
  if (captured.length <= limit) return;
  captured.splice(0, captured.length - limit);
}