
export const discardOldWrites = (state: MockStdoutState) => {
  const { limit, writes } = state;
  if (writes.length <= limit) return;
  writes.splice(0, writes.length - limit);
}