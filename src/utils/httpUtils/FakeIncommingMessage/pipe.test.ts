import { expect, mockFunction } from "../../../index.js";
import { httpUtils } from "../httpUtils.js";
import https from 'https';
import http from 'http';
import { PassThrough } from "stream";

export const beforeEach = () => {
  httpUtils.mock();
}
export const afterEach = () => {
  httpUtils.restore();
}

export const pipeTest = () => new Promise<void>((resolve, reject) => {
  const responseData = JSON.stringify({ foo: "bar" });
  httpUtils.setResponseData(responseData, 4);

  const stream = new PassThrough();

  const callback = mockFunction((res: http.IncomingMessage) => {
    res.pipe(stream);
    res.on('end', () => {
      expect(stream.read().toString()).is(responseData);
      resolve();
    });
    res.on('error', reject);
  });
  const req = https.request('https://localhost', callback);
  req.end();
});

