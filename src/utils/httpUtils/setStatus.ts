import { mock } from './mock.js';

export const setStatus = (state: HttpState, code?: number, message?: string) => {
  state.statusCode = code;
  state.statusMessage = message;
  mock(state);
}