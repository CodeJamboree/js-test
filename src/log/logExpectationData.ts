import { ExpectationError } from "../expect/ExpectationError";
import { indent } from "./indent.js";

export const logExpectationData = (depth: number, error: ExpectationError) => {
  console.debug(indent(depth, `Actual:`), error.actual);
  console.debug(indent(depth, `Reason:`), error.compare);
  console.debug(indent(depth, `Expected:`), error.expected);
  if (error.details)
    console.debug(indent(depth, `Details:`), error.details);
}
