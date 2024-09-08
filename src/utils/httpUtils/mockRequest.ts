import http from 'http';
import https from 'https';
import { chunks } from './httpUtils.test';

export const mockRequest = (state: HttpState, isHttps: boolean, ...args: any[]): http.ClientRequest => {

  let req: http.ClientRequest;
  let first: string | URL | http.ClientRequestArgs = args[0];
  let second: https.RequestOptions | ((res: http.IncomingMessage) => void) = args[1];
  const last = args.slice(-1)[0];
  const callback: undefined | ((res: http.IncomingMessage) => void) = typeof last === 'function' ? last : undefined;

  let clientRequestArgs: http.ClientRequestArgs;
  if (typeof first === 'string') {
    first = new URL(first);
  }
  if (first instanceof URL) {
    clientRequestArgs = {
      hostname: first.hostname,
      path: first.pathname,
      protocol: first.protocol
    }
    if (typeof second === 'object') {
      clientRequestArgs = {
        ...clientRequestArgs,
        ...second
      }
    }
  } else {
    clientRequestArgs = first as http.ClientRequestArgs
  }
  const url = new URL(`${clientRequestArgs.protocol ?? 'http:'}//${clientRequestArgs.host ?? 'localhost'}${clientRequestArgs.path}`);

  req = new state.clientRequest(clientRequestArgs);

  let requestEndTimeout: NodeJS.Timeout | undefined = setTimeout(() => {
    req.emit('timeout');
    req.emit('error', 'Request timed out');
    clearTimeout(requestEndTimeout);
    requestEndTimeout = undefined;
  }, state.requestTimeoutMs);

  req.on('finish', () => {

    if (requestEndTimeout) {
      clearTimeout(requestEndTimeout);
      requestEndTimeout = undefined;
    }
    let responseEndTimeout: NodeJS.Timeout | undefined = setTimeout(() => {
      res.emit('timeout');
      res.emit('error', 'Response timed out');
      clearTimeout(responseEndTimeout);
      responseEndTimeout = undefined;
    }, state.responseTimeoutMs);

    let res: http.IncomingMessage = new state.incomingMessage(req.socket);

    res.url = url.toString();

    if (state.statusCode)
      res.statusCode = state.statusCode;
    if (state.statusMessage)
      res.statusMessage = state.statusMessage;

    if (state.chunks && !('content-length' in res.headers)) {
      const bytes = state.chunks?.reduce((sum, chunk) => sum + chunk.length, 0) ?? 0;
      res.headers['content-length'] = bytes.toString();
    }

    res.on('end', () => {
      if (responseEndTimeout) {
        clearTimeout(responseEndTimeout);
        responseEndTimeout = undefined;
      }
    });

    req.emit('response', res);
    callback?.(res);
    state.chunks?.forEach((chunk) => {
      res.push(chunk);
    });
    res.push(null);
  });
  return req;
}