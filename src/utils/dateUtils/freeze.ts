import { set } from './set.js';
import { OriginalDate } from './OriginalDate.js';

export const freeze = () => {
  set((new OriginalDate()).getTime());
}