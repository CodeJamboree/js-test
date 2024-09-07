import { standardOutWrite } from "./standardOutWrite.js";
import { standardErrorWrite } from "./standardErrorWrite.js";

export const passThrough = (type: StandardType, args: writeArgs) => {
  const write = type === 'standard' ? standardOutWrite : standardErrorWrite;
  switch (args.length) {
    case 1: return write(args[0]);
    case 2: return write(args[0], args[1]);
    case 3: return write(args[0], args[1], args[2]);
    default: return false;
  }
}
