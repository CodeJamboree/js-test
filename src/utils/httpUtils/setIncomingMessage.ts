import http from 'http';
import { mock } from './mock.js';

export const setIncomingMessage = (state: HttpState, response: Partial<http.IncomingMessage>) => {
  state.incomingMessage = response;
  mock(state);
}