
type RawCapture = (Uint8Array | string);
type EncodedCapture = [RawCapture, BufferEncoding | undefined];
type WriteData = RawCapture | EncodedCapture;
type Write = {
  type: standardType,
  data: WriteData
};

type StandardType = 'standard' | 'error';

interface MockStdoutState {
  writes: Write[],
  allowWrite: boolean,
  logWrite: boolean,
  limit: number
}

type callback = (err?: Error) => void;

type writeArgs = [Uint8Array] |
[Uint8Array | string, callback] |
[Uint8Array | string, BufferEncoding, callback]