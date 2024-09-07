import { set } from './set.js';
import { originalHrtime } from './originalHrtime.js';

export const freeze = () => {
  set(originalHrtime());
}