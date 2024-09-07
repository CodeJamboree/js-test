export const called = (state: MockFunctionState): boolean => {
  return state.calls.length !== 0;
}
