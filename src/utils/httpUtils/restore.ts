import https from 'https';
import http from 'http';
import { originalHttpsRequest } from './originalHttpsRequest.js';
import { originalHttpRequest } from './originalHttpRequest.js';

export const restore = (state: HttpState) => {
  state.mocked = false;
  https.request = originalHttpsRequest;
  http.request = originalHttpRequest;
}