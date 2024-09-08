import { mock } from './mock.js';

export const setChunks = (state: HttpState, chunks: (string | Uint8Array)[]) => {
  const encoder = new TextEncoder();
  state.chunks = chunks.map(chunk => {
    if (typeof chunk === 'string') {
      return encoder.encode(chunk);
    }
    return chunk;
  });
  mock(state);
}