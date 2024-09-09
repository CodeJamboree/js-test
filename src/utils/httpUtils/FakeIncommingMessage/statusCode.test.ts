import { expect, mockFunction } from "../../../index.js";
import { httpUtils } from "../httpUtils.js";
import https from 'https';
import http from 'http';

export const beforeEach = () => {
  httpUtils.mock();
}
export const afterEach = () => {
  httpUtils.restore();
}

export const canCustomizeCode = () => new Promise<void>((resolve, reject) => {
  httpUtils.setStatus(123);
  const callback = mockFunction((res: http.IncomingMessage) => {
    expect(res.statusCode).is(123)
    resolve();
  });
  const req = https.request('https://localhost', callback);
  req.end();
});

export const undefinedByDefault = () => new Promise<void>((resolve, reject) => {
  const callback = mockFunction((res: http.IncomingMessage) => {
    expect(res.statusCode).is(undefined)
    resolve();
  });
  const req = https.request('https://localhost', callback);
  req.end();
});

