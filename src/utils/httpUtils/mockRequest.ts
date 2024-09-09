import http from 'http';
import https from 'https';

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

  req = new state.FakeClientRequest(clientRequestArgs);

  let requestEndTimeout: NodeJS.Timeout | undefined = undefined;

  const clearRequestTimeout = () => {
    if (requestEndTimeout) {
      clearTimeout(requestEndTimeout);
      requestEndTimeout = undefined;
    }
    state.emitter.off('restore', clearRequestTimeout);
  }
  requestEndTimeout = setTimeout(() => {
    clearRequestTimeout();
    req.emit('timeout');
    req.emit('error', 'Request timed out');
  }, state.requestTimeoutMs);

  state.emitter.once('restore', clearRequestTimeout);


  req.on('finish', () => {
    clearRequestTimeout();
    let responseEndTimeout: NodeJS.Timeout | undefined = undefined;

    const clearResponseTimeout = () => {
      if (responseEndTimeout) {
        clearTimeout(responseEndTimeout);
        responseEndTimeout = undefined;
      }
      state.emitter.off('restore', clearResponseTimeout);
    }
    responseEndTimeout = setTimeout(() => {
      clearResponseTimeout();
      res.emit('timeout');
      res.emit('error', 'Response timed out');
    }, state.responseTimeoutMs);
    state.emitter.once('restore', clearResponseTimeout);

    let res: http.IncomingMessage = new state.FakeIncomingMessage(req.socket);

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
      clearResponseTimeout();
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