export class MockedFunctionError extends Error {
  toString() {
    return `${this.constructor.name}: ${this.message}`;
  }
}
