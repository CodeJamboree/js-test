export const writeAt = (state: MockStdoutState, index: number): WriteData => {
  const count = state.writes.length;
  const i = index < 0 ? count + index : index;
  if (i >= state.writes.length || i < 0) {
    throw new Error(`Out of range ${i} (${index}). Max ${state.writes.length}`);
  }
  return state.writes[i].data;
}