import { dateUtils } from '../dateUtils/dateUtils.js';
import { performanceUtils } from '../performanceUtils/performanceUtils.js';
import { processUtils } from '../processUtils/processUtils.js';

export const restore = () => {
  performanceUtils.restore();
  processUtils.restore();
  dateUtils.restore();
}