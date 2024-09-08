interface HttpState {
  clientRequest: Partial<http.ClientRequest>,
  incomingMessage: Partial<http.IncomingMessage>,
  chunks?: any[],
  mocked: boolean,
  statusCode?: number,
  statusMessage?: string,
  requestTimeoutMs: number
}