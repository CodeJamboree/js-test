export const returns = (state: MockFunctionState, value: any): void => {
  state.mockReturn = true;
  state.returns = value;
}
