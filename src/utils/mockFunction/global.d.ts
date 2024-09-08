
type Call = any[];

interface MockFunctionState {
  calls: Call[],
  mockReturn: boolean,
  returns: any
}

interface MockFunction<T extends (...args: any[]) => any = (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  called: () => boolean,
  callCount: () => number,
  callArg: (index?: number, argIndex?: number) => any,
  callAt: (index: number) => Call
}