interface HttpState {
  FakeClientRequest: Partial<http.ClientRequest>,
  FakeIncomingMessage: Partial<http.IncomingMessage>,
  chunks?: Uint8Array[],
  mocked: boolean,
  statusCode?: number,
  statusMessage?: string,
  requestTimeoutMs: number,
  responseTimeoutMs: number
}