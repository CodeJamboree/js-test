export const typeAt = (state: MockStdoutState, index: number): StandardType => {
  const count = state.writes.length;
  const i = index < 0 ? count + index : index;
  if (i >= state.writes.length) {
    throw new Error(`Out of range ${i} (${index}). Max ${state.writes.length}`);
  }
  return state.writes[i].type;
}