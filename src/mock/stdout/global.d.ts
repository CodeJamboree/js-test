
type RawCapture = (Uint8Array | string);
type EncodedCapture = [RawCapture, BufferEncoding | undefined]
type Capture = RawCapture | EncodedCapture;

interface MockStdoutState {
  captured: Capture[],
  showLogs: boolean,
  limit: number
}

type callback = (err?: Error) => void;

type writeArgs = [Uint8Array] |
[Uint8Array | string, callback] |
[Uint8Array | string, BufferEncoding, callback]