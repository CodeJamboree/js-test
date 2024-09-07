import { OriginalDate } from "./OriginalDate.js";
import { frozenArgs } from "./frozenArgs.js";

export class FakeDate extends OriginalDate {
  constructor();
  constructor(value: number | string | Date);
  constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
  constructor(...args: DateConstructorArgs) {
    if (args.length === 0) {
      // @ts-expect-error
      super(...frozenArgs());
    } else {
      // @ts-expect-error
      super(...args);
    }
  }
  static now(): number {
    return new FakeDate().getTime();
  }
  static parse(s: string): number {
    return OriginalDate.parse(s);
  }

  static UTC(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number {
    return OriginalDate.UTC(year, monthIndex, date, hours, minutes, seconds, ms);
  }
  toString(): string {
    return super.toString();
  }
}