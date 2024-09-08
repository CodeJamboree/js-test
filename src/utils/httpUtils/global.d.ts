interface HttpState {
  clientRequest: Partial<http.ClientRequest>,
  incomingMessage: Partial<http.IncomingMessage>,
  chunks?: Uint8Array[],
  mocked: boolean,
  statusCode?: number,
  statusMessage?: string,
  requestTimeoutMs: number,
  responseTimeoutMs: number
}