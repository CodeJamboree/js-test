import https from 'https';
import http from 'http';
import { originalHttpsRequest } from './originalHttpsRequest.js';
import { originalHttpRequest } from './originalHttpRequest.js';

export const restore = (state: HttpState) => {
  state.mocked = false;
  state.emitter.emit('restore');
  state.emitter.removeAllListeners('restore');
  https.request = originalHttpsRequest;
  http.request = originalHttpRequest;
  state.statusCode = undefined;
  state.statusMessage = undefined;
  state.chunks = undefined;
}