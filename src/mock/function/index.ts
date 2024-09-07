import { callAt } from "./callAt.js";
import { callArg } from "./callArg.js";
import { callCount } from "./callCount.js";
import { called } from "./called.js";
import { returns } from "./returns.js";

export const mockFunction = (callback?: Function): MockFunction => {

  const state: MockFunctionState = {
    calls: [] as Call[],
    mockReturn: false,
    returns: undefined
  }

  const mock = function (this: MockFunction, ...args: any[]): any {
    state.calls.push(args.slice());
    let result;
    if (typeof callback === 'function') {
      result = callback(...args);
    }
    if (state.mockReturn) return state.returns;
    return result;
  }

  mock.returns = returns.bind(mock, state);
  mock.callCount = callCount.bind(mock, state);
  mock.called = called.bind(mock, state);
  mock.callAt = callAt.bind(mock, state);
  mock.callArg = callArg.bind(mock, state);

  return mock;
}