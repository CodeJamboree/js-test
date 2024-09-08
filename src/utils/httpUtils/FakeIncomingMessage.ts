import http from 'http';
import { EventEmitter } from 'events';

// TODO: Complete stubbing this out
export class FakeIncomingMessage implements Partial<http.IncomingMessage> {

  private emitter = new EventEmitter();

  closed: boolean = false;

  constructor() {
  }

  eventNames(): (string | symbol)[] {
    return this.emitter.eventNames();
  }

  on(event: 'close', listener: () => void): http.IncomingMessage;
  on(event: 'data', listener: (chunk: any) => void): http.IncomingMessage;
  on(event: 'end', listener: () => void): http.IncomingMessage;
  on(event: 'error', listener: (err: Error) => void): http.IncomingMessage;
  on(event: 'pause', listener: () => void): http.IncomingMessage;
  on(event: 'readable', listener: () => void): http.IncomingMessage;
  on(event: 'resume', listener: () => void): http.IncomingMessage;
  on(event: unknown, listener: unknown): http.IncomingMessage;
  on(event: string | symbol, listener: (...args: any[]) => void): http.IncomingMessage {
    this.emitter.on(event, listener);
    return this as unknown as http.IncomingMessage;
  }
  emit(event: 'close'): boolean;
  emit(event: 'data', chunk: any): boolean;
  emit(event: 'end'): boolean;
  emit(event: 'error', err: Error): boolean;
  emit(event: 'pause'): boolean;
  emit(event: 'readable'): boolean;
  emit(event: 'resume'): boolean;
  emit(event: unknown, err?: unknown, ...rest: unknown[]): boolean;
  emit(event: string | symbol, ...args: any[]): boolean {
    let hadListeners = this.emitter.emit(event, ...args);
    if (event === 'close') this.closed = true;
    return hadListeners;
  }

  push(chunk: any, encoding?: BufferEncoding): boolean {
    console.warn('-------pushing', chunk);
    let hadListeners = false;

    if (chunk !== null) {
      hadListeners = this.emit('data', chunk, encoding);
    }
    if (chunk === null) {
      hadListeners ||= this.emit('end');
    }
    return hadListeners;
  }

}