import { frozenArgs } from "./frozenArgs.js";
import { FakeDate } from "./FakeDate.js";

export const set = (...defaultArgs: DateConstructorArgs) => {
  frozenArgs(defaultArgs);
  // @ts-expect-error
  Date = FakeDate;
}
