import http from 'http';
import { EventEmitter } from 'events';
import { Readable } from 'stream';
import { Socket } from 'net';

// TODO: Complete stubbing this out
export class FakeClientRequest implements Partial<http.ClientRequest> {
  private emitter = new EventEmitter();
  private headers: Record<string, string | number | string[] | undefined> = {};

  closed: boolean = false;
  writable: boolean = true;
  writableNeedDrain: boolean = false;
  method: string;
  maxHeadersCount: number = 0;
  host: string;
  path: string;
  protocol: string;

  constructor(request: http.ClientRequestArgs) {
    this.method = request.method ?? 'GET';
    this.host = request.host ?? 'localhost';
    this.path = request.path ?? '/';
    this.protocol = request.protocol ?? 'http:';

    if (request.headers) {
      Object.entries(request.headers).forEach(([name, value]) => {
        this.headers[name.toLowerCase()] = value;
      });
    }
  }

  hasHeader(name: string): boolean {
    return (name.toLowerCase() in this.headers);
  }
  getHeader(name: string): number | string | string[] | undefined {
    if (!this.hasHeader(name)) return;
    return this.headers[name.toLowerCase()];
  }
  getHeaderNames(): string[] {
    return Object.keys(this.headers);
  }
  setHeader(name: string, value: number | string | readonly string[]): http.ClientRequest {
    const key = name.toLowerCase();
    const limit = this.maxHeadersCount;
    if (!this.hasHeader(name) && limit !== 0 && this.getHeaderNames().length >= limit) {
      throw new Error(`Headers would exceed maxHeadersCount: ${limit}`);
    }
    if (typeof value === 'object') {
      this.headers[key] = value.slice();
    } else {
      this.headers[key] = value;
    }
    return this as unknown as http.ClientRequest;
  }
  removeHeader(name: string): void {
    const key = name.toLowerCase();
    if (key in this.headers) {
      delete this.headers[key];
    }
  }
  getHeaders(): http.OutgoingHttpHeaders {
    return this.headers;
  }
  appendHeader(name: string, value: string | readonly string[]): http.ClientRequest {
    return this.setHeader(name, value);
  }
  getRawHeaderNames(): string[] {
    return this.getHeaderNames();
  }
  rawListeners<K>(eventName: string | symbol): Function[] {
    return this.emitter.rawListeners(eventName);
  }
  removeAllListeners(eventName?: string | symbol | undefined): http.ClientRequest {
    this.emitter.removeAllListeners(eventName);
    return this as unknown as http.ClientRequest;
  }
  removeListener(event: 'close', listener: () => void): http.ClientRequest;
  removeListener(event: 'drain', listener: () => void): http.ClientRequest;
  removeListener(event: 'error', listener: (err: Error) => void): http.ClientRequest;
  removeListener(event: 'finish', listener: () => void): http.ClientRequest;
  removeListener(event: 'pipe', listener: (src: Readable) => void): http.ClientRequest;
  removeListener(event: 'unpipe', listener: (src: Readable) => void): http.ClientRequest;
  removeListener(event: unknown, listener: unknown): http.ClientRequest;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): http.ClientRequest {
    this.emitter.removeListener(event, listener);
    return this as unknown as http.ClientRequest;
  }
  addListener(event: 'abort', listener: () => void): http.ClientRequest;
  addListener(event: 'connect', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  addListener(event: 'continue', listener: () => void): http.ClientRequest;
  addListener(event: 'information', listener: (info: http.InformationEvent) => void): http.ClientRequest;
  addListener(event: 'response', listener: (response: http.IncomingMessage) => void): http.ClientRequest;
  addListener(event: 'socket', listener: (socket: Socket) => void): http.ClientRequest;
  addListener(event: 'timeout', listener: () => void): http.ClientRequest;
  addListener(event: 'upgrade', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  addListener(event: 'close', listener: () => void): http.ClientRequest;
  addListener(event: 'drain', listener: () => void): http.ClientRequest;
  addListener(event: 'error', listener: (err: Error) => void): http.ClientRequest;
  addListener(event: 'finish', listener: () => void): http.ClientRequest;
  addListener(event: 'pipe', listener: (src: Readable) => void): http.ClientRequest;
  addListener(event: 'unpipe', listener: (src: Readable) => void): http.ClientRequest;
  addListener(event: unknown, listener: unknown): http.ClientRequest;
  addListener(event: string | symbol, listener: (...args: any[]) => void): http.ClientRequest {
    this.emitter.addListener(event, listener);
    return this as unknown as http.ClientRequest;
  }
  setMaxListeners(n: number): http.ClientRequest {
    this.emitter.setMaxListeners(n);
    return this as unknown as http.ClientRequest;
  }

  eventNames(): (string | symbol)[] {
    return this.emitter.eventNames();
  }
  getMaxListeners(): number {
    return this.emitter.getMaxListeners();
  }
  listenerCount<K>(eventName: string | symbol, listener?: Function | undefined): number {
    return this.emitter.listenerCount(eventName);
  }
  once(event: 'abort', listener: () => void): http.ClientRequest;
  once(event: 'connect', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  once(event: 'continue', listener: () => void): http.ClientRequest;
  once(event: 'information', listener: (info: http.InformationEvent) => void): http.ClientRequest;
  once(event: 'response', listener: (response: http.IncomingMessage) => void): http.ClientRequest;
  once(event: 'socket', listener: (socket: Socket) => void): http.ClientRequest;
  once(event: 'timeout', listener: () => void): http.ClientRequest;
  once(event: 'upgrade', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  once(event: 'close', listener: () => void): http.ClientRequest;
  once(event: 'drain', listener: () => void): http.ClientRequest;
  once(event: 'error', listener: (err: Error) => void): http.ClientRequest;
  once(event: 'finish', listener: () => void): http.ClientRequest;
  once(event: 'pipe', listener: (src: Readable) => void): http.ClientRequest;
  once(event: 'unpipe', listener: (src: Readable) => void): http.ClientRequest;
  once(event: unknown, listener: unknown): http.ClientRequest;
  once(event: string | symbol, listener: (...args: any[]) => void): http.ClientRequest {
    this.emitter.once(event, listener);
    return this as unknown as http.ClientRequest;
  }
  off<K>(eventName: string | symbol, listener: (...args: any[]) => void): http.ClientRequest {
    this.emitter.off(eventName, listener);
    return this as unknown as http.ClientRequest;
  }
  prependListener(event: 'abort', listener: () => void): http.ClientRequest;
  prependListener(event: 'connect', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  prependListener(event: 'continue', listener: () => void): http.ClientRequest;
  prependListener(event: 'information', listener: (info: http.InformationEvent) => void): http.ClientRequest;
  prependListener(event: 'response', listener: (response: http.IncomingMessage) => void): http.ClientRequest;
  prependListener(event: 'socket', listener: (socket: Socket) => void): http.ClientRequest;
  prependListener(event: 'timeout', listener: () => void): http.ClientRequest;
  prependListener(event: 'upgrade', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  prependListener(event: 'close', listener: () => void): http.ClientRequest;
  prependListener(event: 'drain', listener: () => void): http.ClientRequest;
  prependListener(event: 'error', listener: (err: Error) => void): http.ClientRequest;
  prependListener(event: 'finish', listener: () => void): http.ClientRequest;
  prependListener(event: 'pipe', listener: (src: Readable) => void): http.ClientRequest;
  prependListener(event: 'unpipe', listener: (src: Readable) => void): http.ClientRequest;
  prependListener(event: unknown, listener: unknown): http.ClientRequest;
  prependListener(event: string | symbol, listener: (...args: any[]) => void): http.ClientRequest {
    this.emitter.prependListener(event, listener);
    return this as unknown as http.ClientRequest;
  }
  prependOnceListener(event: 'abort', listener: () => void): http.ClientRequest;
  prependOnceListener(event: 'connect', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  prependOnceListener(event: 'continue', listener: () => void): http.ClientRequest;
  prependOnceListener(event: 'information', listener: (info: http.InformationEvent) => void): http.ClientRequest;
  prependOnceListener(event: 'response', listener: (response: http.IncomingMessage) => void): http.ClientRequest;
  prependOnceListener(event: 'socket', listener: (socket: Socket) => void): http.ClientRequest;
  prependOnceListener(event: 'timeout', listener: () => void): http.ClientRequest;
  prependOnceListener(event: 'upgrade', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  prependOnceListener(event: 'close', listener: () => void): http.ClientRequest;
  prependOnceListener(event: 'drain', listener: () => void): http.ClientRequest;
  prependOnceListener(event: 'error', listener: (err: Error) => void): http.ClientRequest;
  prependOnceListener(event: 'finish', listener: () => void): http.ClientRequest;
  prependOnceListener(event: 'pipe', listener: (src: Readable) => void): http.ClientRequest;
  prependOnceListener(event: 'unpipe', listener: (src: Readable) => void): http.ClientRequest;
  prependOnceListener(event: unknown, listener: unknown): http.ClientRequest;
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): http.ClientRequest {
    this.emitter.prependOnceListener(event, listener);
    return this as unknown as http.ClientRequest;
  }
  on(event: 'abort', listener: () => void): http.ClientRequest;
  on(event: 'connect', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  on(event: 'continue', listener: () => void): http.ClientRequest;
  on(event: 'information', listener: (info: http.InformationEvent) => void): http.ClientRequest;
  on(event: 'response', listener: (response: http.IncomingMessage) => void): http.ClientRequest;
  on(event: 'socket', listener: (socket: Socket) => void): http.ClientRequest;
  on(event: 'timeout', listener: () => void): http.ClientRequest;
  on(event: 'upgrade', listener: (response: http.IncomingMessage, socket: Socket, head: Buffer) => void): http.ClientRequest;
  on(event: 'close', listener: () => void): http.ClientRequest;
  on(event: 'drain', listener: () => void): http.ClientRequest;
  on(event: 'error', listener: (err: Error) => void): http.ClientRequest;
  on(event: 'finish', listener: () => void): http.ClientRequest;
  on(event: 'pipe', listener: (src: Readable) => void): http.ClientRequest;
  on(event: 'unpipe', listener: (src: Readable) => void): http.ClientRequest;
  on(event: unknown, listener: unknown): http.ClientRequest;
  on(event: string | symbol, listener: (...args: any[]) => void): http.ClientRequest {
    this.emitter.on(event, listener);
    return this as unknown as http.ClientRequest;
  }

  emit(event: 'close'): boolean;
  emit(event: 'drain'): boolean;
  emit(event: 'error', err: Error): boolean;
  emit(event: 'finish'): boolean;
  emit(event: 'pipe', src: Readable): boolean;
  emit(event: 'unpipe', src: Readable): boolean;
  emit(event: unknown, src?: unknown, ...rest: unknown[]): boolean;
  emit(event: string | symbol, ...args: any[]): boolean {
    let hadListeners = this.emitter.emit(event, ...args);
    if (event === 'close') this.closed = true;
    return hadListeners;
  }

  end(cb: () => void): http.ClientRequest;
  end(chunk: any, cb?: () => void): http.ClientRequest;
  end(chunk: any, encoding: BufferEncoding, cb?: () => void): http.ClientRequest;
  end(chunk?: unknown, encoding?: unknown, cb?: unknown): http.ClientRequest {
    this.emitter.emit('finish');
    return this as unknown as http.ClientRequest;
  }

  write(chunk: any, callback?: (error: Error | null | undefined) => void): boolean;
  write(chunk: any, encoding: BufferEncoding, callback?: (error: Error | null | undefined) => void): boolean;
  write(chunk: unknown, encoding?: unknown, callback?: unknown): boolean {
    if (!this.writable) return false;
    this.writable = false;
    this.writableNeedDrain = true;
    setTimeout(() => {
      this.writable = true;
      this.writableNeedDrain = false;
      this.emit('drain');
    }, 10);
    return true;
  }


}