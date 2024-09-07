
export const parseCapture = (args: writeArgs) => {
  const cb = typeof args.at(-1) === 'function';
  let noCb = cb ? args.slice(0, -1) : args;
  switch (noCb.length) {
    case 0: return;
    case 1: return noCb[0] as RawCapture;
    default: return noCb as EncodedCapture;
  }
}