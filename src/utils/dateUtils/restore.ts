import { OriginalDate } from "./OriginalDate.js";

export const restore = () => {
  Date = OriginalDate;
}
