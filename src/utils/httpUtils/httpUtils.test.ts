import { expect } from "../../index.js";
import { httpUtils } from "./httpUtils.js";
import https from 'https';
import http from 'http';

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
  const chunksReceived: any[] = [];
  const request = https.request("https://codejamboree.com");
  request.on('response', res => {
    res.on('data', chunk => {
      chunksReceived.push(new TextDecoder().decode(chunk));
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

export const callback = async () => new Promise<void>((resolve) => {
  httpUtils.mock();

  const callback = (res: http.IncomingMessage) => {
    res.on('end', () => {
      resolve();
    });
  };

  const request = https.request("https://codejamboree.com", callback);
  request.end();
});


export const postDataWithEncodedResponse = async () => new Promise<void>((resolve) => {
  httpUtils.mock();
  const responseData = JSON.stringify({ message: "Received!" });
  httpUtils.setResponseData(responseData);

  const callback = (res: http.IncomingMessage) => {
    const chunks: string[] = [];
    res.setEncoding('utf8')
    res.on('data', (chunk: string) => {
      chunks.push(chunk);
    });
    res.on('end', () => {
      const receivedData = JSON.parse(chunks.join(''));
      expect(receivedData.message).is('Received!');
      resolve();
    });
  };

  const url = new URL("https://codejamboree.com");

  const postData = JSON.stringify({ name: "Lewis Moten" });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }
  const request = https.request(options, callback);
  request.write(postData);
  request.end();
});