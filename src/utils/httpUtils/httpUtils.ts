import { setClientRequest } from './setClientRequest.js';
import { setIncomingMessage } from './setIncomingMessage.js';
import { setChunks } from './setChunks.js';
import { setStatus } from './setStatus.js';
import { restore } from './restore.js';
import { FakeIncomingMessage } from './FakeIncommingMessage/FakeIncomingMessage.js';
import { FakeClientRequest } from './FakeClientRequest.js';
import { mock } from './mock.js';
import { setResponseData } from './setResponseData.js';
import EventEmitter from 'events';

const state: HttpState = {
  FakeClientRequest,
  FakeIncomingMessage,
  mocked: false,
  requestTimeoutMs: 100,
  responseTimeoutMs: 100,
  emitter: new EventEmitter()
}

export const httpUtils = {
  setClientRequest: setClientRequest.bind(null, state),
  setIncomingMessage: setIncomingMessage.bind(null, state),
  restore: restore.bind(null, state),
  setChunks: setChunks.bind(null, state),
  setResponseData: setResponseData.bind(null, state),
  setStatus: setStatus.bind(null, state),
  mock: mock.bind(null, state)
}
