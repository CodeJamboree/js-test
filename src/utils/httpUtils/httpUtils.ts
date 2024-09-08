import { setClientRequest } from './setClientRequest.js';
import { setIncomingMessage } from './setIncomingMessage.js';
import { setChunks } from './setChunks.js';
import { setStatus } from './setStatus.js';
import { restore } from './restore.js';
import { FakeIncomingMessage } from './FakeIncomingMessage.js';
import { FakeClientRequest } from './FakeClientRequest.js';

const state: HttpState = {
  clientRequest: FakeClientRequest,
  incomingMessage: FakeIncomingMessage,
  mocked: false,
  requestTimeoutMs: 1000
}

export const httpUtils = {
  setClientRequest: setClientRequest.bind(null, state),
  setIncomingMessage: setIncomingMessage.bind(null, state),
  restore: restore.bind(null, state),
  setChunks: setChunks.bind(null, state),
  setStatus: setStatus.bind(null, state)
}
