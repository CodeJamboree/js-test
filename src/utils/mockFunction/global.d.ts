
type Call = any[];

interface MockFunctionState {
  calls: Call[],
  mockReturn: boolean,
  returns: any
}

interface MockFunction extends Function {
  called: () => boolean,
  callCount: () => number,
  callArg: (index?: number, argIndex?: number) => any,
  callAt: (index: number) => Call
}