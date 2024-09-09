export class ExpectationError extends Error {
  actual: any;
  details?: string;
  expected?: any;
  compare: string;
  constructor(actual: any, compare: string, expected: any, details?: string) {
    const message = `Failed expectation: ${actual} ${compare} ${expected}`;
    super(message);
    this.actual = actual;
    this.details = details;
    this.expected = expected;
    this.compare = compare;
  }
  toJSON() {
    return `${this.constructor.name}: ${this.message}`;
  }
  toString() {
    return `${this.constructor.name}: ${this.message}`;
  }
}