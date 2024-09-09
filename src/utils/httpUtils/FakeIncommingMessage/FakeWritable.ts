import { Writable } from "stream";

export class FakeWritable extends Writable {
  private chunks: any[] = [];
  write(chunk: any, callback?: ((error: Error | null | undefined) => void) | undefined): boolean;
  write(chunk: any, encoding: BufferEncoding, callback?: ((error: Error | null | undefined) => void) | undefined): boolean;
  write(chunk: unknown, encoding?: unknown, callback?: unknown): boolean {
    this.addChunk(chunk, encoding, callback);
    return true;
  }
  private addChunk(chunk: unknown, encoding?: unknown, callback?: unknown) {
    this.chunks.push(chunk);
    if (typeof callback === 'function')
      callback(undefined);
    else if (typeof encoding === 'function')
      encoding(undefined);
  }
  toString(): string {
    return Buffer.concat(this.chunks).toString();
  }
  end(cb?: (() => void) | undefined): this;
  end(chunk: any, cb?: (() => void) | undefined): this;
  end(chunk: any, encoding: BufferEncoding, cb?: (() => void) | undefined): this;
  end(chunk?: unknown, encoding?: unknown, cb?: unknown): this {
    if (typeof chunk !== 'function' && chunk !== undefined && chunk !== null) {
      this.addChunk(chunk, encoding, cb);
    }
    this.emit('end');
    return this;
  }
}