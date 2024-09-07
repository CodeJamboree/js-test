import { originalHrtime } from './originalHrtime.js';

export const restore = () => {
  process.hrtime = originalHrtime;
}

