import http from 'http';
import { mock } from './mock.js';

export const setClientRequest = (state: HttpState, request: Partial<http.ClientRequest>) => {
  state.clientRequest = request;
  mock(state);
}