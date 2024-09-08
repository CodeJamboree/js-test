import { setChunks } from './setChunks.js';

export const setResponseData = (state: HttpState, data: string | Uint8Array, chunkSize: number = 1024) => {
  if (typeof data === 'string') {
    data = new TextEncoder().encode(data);
  }

  const chunks: Uint8Array[] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  setChunks(state, chunks);
}