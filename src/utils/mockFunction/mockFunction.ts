import { callAt } from "./callAt.js";
import { callArg } from "./callArg.js";
import { callCount } from "./callCount.js";
import { called } from "./called.js";
import { returns } from "./returns.js";

export const mockFunction = <T extends (...args: any[]) => any>(callback?: T): MockFunction<T> => {

  const state: MockFunctionState = {
    calls: [] as Call[],
    mockReturn: false,
    returns: undefined
  }

  const mock = function (this: MockFunction<T>, ...args: any[]): any {
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

  const stringify = () => {
    if (!callback) {
      return `[MockedFunction]`;
    }
    let name = callback.name;
    if ((name ?? '') === '') name = '(anonymous)';
    return `[MockedFunction: ${name}]`;
  };

  mock.toString = stringify;
  mock.toJSON = stringify;

  return mock;
}