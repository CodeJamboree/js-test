import http from 'http';
import { EventEmitter } from 'events';

// TODO: Complete stubbing this out
export class FakeIncomingMessage implements Partial<http.IncomingMessage> {

  private emitter = new EventEmitter();
  headers: http.IncomingHttpHeaders;
  headersDistinct: NodeJS.Dict<string[]>;

  closed: boolean = false;
  url: string = '';
  readableEncoding: BufferEncoding | null = null;

  private destinations: {
    stream: NodeJS.WritableStream,
    end: boolean
  }[] = [];

  pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined; } | undefined): T {
    this.destinations.push({
      stream: destination,
      end: options?.end ?? true
    });
    return destination;
  }

  constructor() {
    this.headers = {};
    this.headersDistinct = Object.fromEntries(
      Object.entries(this.headers)
        .map(
          ([name, value]) => [name, Array.isArray(value) ? value : value ? [value] : []]
        ));
  }
  toJSON(): string {
    return `[FakeIncomingMessage] ${this.url} ${JSON.stringify({
      headers: this.headers
    })}`;
  }

  setEncoding(encoding: BufferEncoding): http.IncomingMessage {
    this.readableEncoding = encoding;
    return this as unknown as http.IncomingMessage;
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
  off<K>(eventName: string | symbol, listener: (...args: any[]) => void): http.IncomingMessage {
    this.emitter.off(eventName, listener);
    return this as unknown as http.IncomingMessage;
  }
  getMaxListeners(): number {
    return this.emitter.getMaxListeners();
  }
  listenerCount<K>(eventName: string | symbol, listener?: Function | undefined): number {
    return this.emitter.listenerCount(eventName);
  }
  prependOnceListener(event: 'close', listener: () => void): http.IncomingMessage;
  prependOnceListener(event: 'data', listener: (chunk: any) => void): http.IncomingMessage;
  prependOnceListener(event: 'end', listener: () => void): http.IncomingMessage;
  prependOnceListener(event: 'error', listener: (err: Error) => void): http.IncomingMessage;
  prependOnceListener(event: 'pause', listener: () => void): http.IncomingMessage;
  prependOnceListener(event: 'readable', listener: () => void): http.IncomingMessage;
  prependOnceListener(event: 'resume', listener: () => void): http.IncomingMessage;
  prependOnceListener(event: unknown, listener: unknown): http.IncomingMessage;
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): http.IncomingMessage {
    this.emitter.prependOnceListener(event, listener);
    return this as unknown as http.IncomingMessage;
  }
  once(event: 'close', listener: () => void): http.IncomingMessage;
  once(event: 'data', listener: (chunk: any) => void): http.IncomingMessage;
  once(event: 'end', listener: () => void): http.IncomingMessage;
  once(event: 'error', listener: (err: Error) => void): http.IncomingMessage;
  once(event: 'pause', listener: () => void): http.IncomingMessage;
  once(event: 'readable', listener: () => void): http.IncomingMessage;
  once(event: 'resume', listener: () => void): http.IncomingMessage;
  once(event: unknown, listener: unknown): http.IncomingMessage;
  once(event: string | symbol, listener: (...args: any[]) => void): http.IncomingMessage {
    this.emitter.once(event, listener);
    return this as unknown as http.IncomingMessage;
  }
  prependListener(event: 'close', listener: () => void): http.IncomingMessage;
  prependListener(event: 'data', listener: (chunk: any) => void): http.IncomingMessage;
  prependListener(event: 'end', listener: () => void): http.IncomingMessage;
  prependListener(event: 'error', listener: (err: Error) => void): http.IncomingMessage;
  prependListener(event: 'pause', listener: () => void): http.IncomingMessage;
  prependListener(event: 'readable', listener: () => void): http.IncomingMessage;
  prependListener(event: 'resume', listener: () => void): http.IncomingMessage;
  prependListener(event: unknown, listener: unknown): http.IncomingMessage;
  prependListener(event: string | symbol, listener: (...args: any[]) => void): http.IncomingMessage {
    this.emitter.prependListener(event, listener);
    return this as unknown as http.IncomingMessage;
  }
  rawListeners<K>(eventName: string | symbol): Function[] {
    return this.emitter.rawListeners(eventName);
  }
  removeAllListeners(eventName?: string | symbol | undefined): http.IncomingMessage {
    this.emitter.removeAllListeners(eventName);
    return this as unknown as http.IncomingMessage;
  }
  removeListener(event: 'close', listener: () => void): http.IncomingMessage;
  removeListener(event: 'data', listener: (chunk: any) => void): http.IncomingMessage;
  removeListener(event: 'end', listener: () => void): http.IncomingMessage;
  removeListener(event: 'error', listener: (err: Error) => void): http.IncomingMessage;
  removeListener(event: 'pause', listener: () => void): http.IncomingMessage;
  removeListener(event: 'readable', listener: () => void): http.IncomingMessage;
  removeListener(event: 'resume', listener: () => void): http.IncomingMessage;
  removeListener(event: unknown, listener: unknown): http.IncomingMessage;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): http.IncomingMessage {
    this.emitter.removeListener(event, listener);
    return this as unknown as http.IncomingMessage;
  }

  setMaxListeners(n: number): http.IncomingMessage {
    this.emitter.setMaxListeners(n);
    return this as unknown as http.IncomingMessage;
  }

  push(chunk: any, encoding?: BufferEncoding): boolean {
    let hadListeners = false;
    if (chunk === null) {
      this.destinations.forEach(destination => {
        if (!destination.end) return;
        destination.stream.end(() => {
          hadListeners = true;
        });
      });
      hadListeners ||= this.emit('end');
    } else {
      if (this.readableEncoding === null) {
        hadListeners = this.emit('data', chunk, encoding);
      } else {
        const text = new TextDecoder(this.readableEncoding).decode(chunk);
        hadListeners = this.emit('data', text);
      }
      this.destinations.forEach(destination => {
        destination.stream.write(chunk, encoding, () => {
          hadListeners = true;
        });
      });
    }
    return hadListeners;
  }

}