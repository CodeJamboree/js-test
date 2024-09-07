import { Expect } from "./global.js";

export class ExpectationError extends Error {
  data: object | undefined = undefined;
  constructor(message: string, { actual, details }: Expect<any>, data: NonNullable<object> = {}) {
    super(message);
    this.data = {
      actual,
      details,
      ...data
    };
  }
  toString() {
    return `${this.constructor.name}: ${this.message}`;
  }
}