import http from 'http';

export const mockRequest = (state: HttpState, isHttps: boolean, ...args: any[]): http.ClientRequest => {

  let req: http.ClientRequest;
  let first: string | URL | http.ClientRequestArgs = args[0];
  const last = args.slice(-1)[0];
  const callback: undefined | ((res: http.IncomingMessage) => void) = typeof last === 'function' ? last : undefined;

  req = new state.clientRequest(...args);

  let requestEndTimeout: NodeJS.Timeout | undefined = setTimeout(() => {
    req.emit('error', 'Request timed out');
    clearTimeout(requestEndTimeout);
    requestEndTimeout = undefined;
  }, state.requestTimeoutMs);

  req.on('finish', () => {

    if (requestEndTimeout) {
      clearTimeout(requestEndTimeout);
      requestEndTimeout = undefined;
    }

    let res: http.IncomingMessage = new state.incomingMessage(req.socket);

    if (state.statusCode)
      res.statusCode = state.statusCode;
    if (state.statusMessage)
      res.statusMessage = state.statusMessage;

    req.emit('response', res);
    callback?.(res);
    console.warn('sending chunnks');
    state.chunks?.forEach(chunk => {
      res.push(chunk);
    })
    console.warn('sending null chunnk');
    res.push(null);
  });
  return req;
}