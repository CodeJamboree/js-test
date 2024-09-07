
export const writes = (state: MockStdoutState): WriteData[] =>
  state.writes.map(write => write.data);
