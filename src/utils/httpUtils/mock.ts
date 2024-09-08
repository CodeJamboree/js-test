import http from 'http';
import https from 'https';
import { mockRequest } from './mockRequest.js';

export const mock = (state: HttpState) => {
  if (state.mocked) return;
  state.mocked = true;
  http.request = mockRequest.bind(http, state, false);
  https.request = mockRequest.bind(https, state, true);
}
