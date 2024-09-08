import http from 'http';
import { EventEmitter } from 'events';
import { Readable } from 'stream';
import { Socket } from 'net';

// TODO: Complete stubbing this out
export class FakeClientRequest implements Partial<http.ClientRequest> {
  private emitter = new EventEmitter();

  closed: boolean = false;

  constructor() {
  }

  eventNames(): (string | symbol)[] {
    return this.emitter.eventNames();
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


}