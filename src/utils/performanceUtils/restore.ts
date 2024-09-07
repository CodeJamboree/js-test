import { originalNow } from './originalNow.js';

export const restore = () => {
  performance.now = originalNow;
  // process.hrtime = OriginalPerformance.hrtime;
}

