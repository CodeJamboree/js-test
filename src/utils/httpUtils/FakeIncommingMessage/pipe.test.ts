import { expect, mockFunction } from "../../../index.js";
import { httpUtils } from "../httpUtils.js";
import https from 'https';
import http from 'http';
import { ExpectationError } from "../../../expect/ExpectationError.js";
import { FakeWritable } from "./FakeWritable.js";

export const beforeEach = () => {
  httpUtils.mock();
}
export const afterEach = () => {
  httpUtils.restore();
}

export const pipeTest = () => new Promise<void>((resolve, reject) => {
  const responseData = JSON.stringify({ foo: "bar" });
  httpUtils.setResponseData(responseData, 4);
  const stream = new FakeWritable()

  const callback = mockFunction((res: http.IncomingMessage) => {
    res.pipe(stream);
    res.on('end', () => {
      expect(stream.toString()).is(responseData);
      resolve();
    });
    res.on('error', reject);
  });
  const req = https.request('https://localhost', callback);
  req.end();
});


export const ensureEndNotInvoked = () => new Promise<void>((resolve, reject) => {
  const responseData = JSON.stringify({ foo: "bar" });
  httpUtils.setResponseData(responseData, 4);

  const stream = new FakeWritable();
  stream.once('end', () => {
    reject(new ExpectationError('stream', 'invoked', '.end()'))
  });

  const callback = mockFunction((res: http.IncomingMessage) => {
    res.pipe(stream, { end: false });
    res.on('end', () => {
      resolve();
    });
    res.on('error', reject);
  });
  const req = https.request('https://localhost', callback);
  req.end();
});
export const ensureEndInvoked = () => new Promise<void>((resolve, reject) => {
  const responseData = JSON.stringify({ foo: "bar" });
  httpUtils.setResponseData(responseData, 4);

  const stream = new FakeWritable();

  stream.on('end', () => {
    console.log('end invoked');
    resolve();
  });

  const callback = mockFunction((res: http.IncomingMessage) => {
    res.pipe(stream, { end: true });
    res.on('end', () => {
      reject(new ExpectationError('stream', 'did not invoke', '.end()'))

    });
    res.on('error', reject);
  });
  const req = https.request('https://localhost', callback);
  req.end();
});
export const defaultEndInvoked = () => new Promise<void>((resolve, reject) => {
  const responseData = JSON.stringify({ foo: "bar" });
  httpUtils.setResponseData(responseData, 4);

  const stream = new FakeWritable();

  stream.on('end', () => {
    console.log('end invoked');
    resolve();
  });

  const callback = mockFunction((res: http.IncomingMessage) => {
    res.pipe(stream);
    res.on('end', () => {
      reject(new ExpectationError('stream', 'did not invoke', '.end()'))

    });
    res.on('error', reject);
  });
  const req = https.request('https://localhost', callback);
  req.end();
});