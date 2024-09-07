import { write } from "./write.js";

export const passThrough = (args: writeArgs) => {
  switch (args.length) {
    case 1: return write(args[0]);
    case 2: return write(args[0], args[1]);
    case 3: return write(args[0], args[1], args[2]);
    default: return false;
  }
}
