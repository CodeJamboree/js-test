export interface Expect<T> {
  actual: T,
  details?: any,
  negate: boolean,
  equals: <T>(expected: T) => void
  is: <T>(expected: T) => void,
  not: () => Expect<T>,
  above: <T>(expected: T) => void,
  below: <T>(expected: T) => void,
  within: <T>(min: T, max: T) => void,
  isFunction: <T extends Function>(expected?: boolean) => void,
  includes: <T extends string | any[]>(expected: string | any) => void,
  instanceOf: <T extends Function | object>(expected: string | Function | object) => void,
  startsWith: <T extends string>(epected: string) => void,
  endsWith: <T extends string>(expected: string) => void,
  toThrow: <T extends Function>(error?: string | Error) => void,
  lengthOf: <T extends NonNullable<object> | string | Function>(expeced: number) => void
  and: <Y>(actual: Y) => Expect<Y>
}
