import { expect } from "../../index.js";
import { httpUtils } from "./httpUtils.js";
import https from 'https';

export const afterEach = () => {
  httpUtils.restore();
}

export const status = async () => new Promise<void>((resolve, reject) => {
  httpUtils.setStatus(123, "The Status");
  const request = https.request("https://codejamboree.com");
  request.on('response', res => {
    expect(res.statusCode).is(123);
    expect(res.statusMessage).is('The Status');
    resolve();
  });
  request.on('error', reject);
  request.end();
});

export const chunks = async () => new Promise<void>((resolve) => {
  httpUtils.setChunks([
    'first',
    'second',
    'third'
  ]);
  const chunksReceived: string[] = [];
  const request = https.request("https://codejamboree.com");
  request.on('response', res => {
    res.on('data', chunk => {
      chunksReceived.push(chunk);
    });
    res.on('end', () => {
      expect(chunksReceived).equals([
        'first',
        'second',
        'third'
      ]);
      resolve();
    });
  });
  request.end();
});

export const f_callback = async () => new Promise<void>((resolve) => {
  const request = https.request("https://codejamboree.com", (res) => {
    console.warn('got called back');
    res.on('data', chunk => {
      console.warn('got data', chunk);
    });
    res.on('end', () => {
      console.warn('got end');
      resolve();
    });
    console.warn('done with call back');
  });
  console.warn('sending response.end');
  request.end();
  console.warn('sent response.end');
});