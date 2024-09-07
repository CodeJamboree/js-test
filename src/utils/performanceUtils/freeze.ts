import { set } from './set.js';
import { originalNow } from './originalNow.js';

export const freeze = () => {
  set(originalNow());
}