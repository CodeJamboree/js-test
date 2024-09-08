import { mock } from './mock.js';

export const setChunks = (state: HttpState, chunks: any[]) => {
  state.chunks = chunks;
  mock(state);
}