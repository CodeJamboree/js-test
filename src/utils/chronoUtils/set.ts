import { dateUtils } from '../dateUtils/dateUtils.js';
import { performanceUtils } from '../performanceUtils/performanceUtils.js';
import { processUtils } from '../processUtils/processUtils.js';

export const set = (ms: number) => {
  // const seconds = Math.floor(ms / 1000) % 60;
  // const ns = (ms - (Math.floor(ms / 1000) * 1000)) * 1000000;
  dateUtils.set(ms);
  performanceUtils.set(ms);
  processUtils.set([0, 0]);
}
