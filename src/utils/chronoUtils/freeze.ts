import { set } from './set.js';

const OriginalDate = Date;

export const freeze = () => {
  set(new OriginalDate().getTime());
}