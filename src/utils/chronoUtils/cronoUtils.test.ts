import { chronoUtils } from "../index.js";
import { expect } from "../../expect/expect.js";

export const afterEach = () => {
  chronoUtils.restore();
}

export const freezesHrtime = () => {
  const time1 = process.hrtime();
  const time2 = process.hrtime();
  expect(time1, 'normal').not().equals(time2);

  chronoUtils.freeze();
  const time3 = process.hrtime();
  const time4 = process.hrtime();
  expect(time3, 'frozen').equals(time4);

  chronoUtils.restore();
  const time5 = process.hrtime();
  const time6 = process.hrtime();
  expect(time5, 'restored').not().equals(time6);
}

export const freezesPerfromance = () => {
  const now1 = performance.now();
  const now2 = performance.now();
  expect(now1, 'normal').not().equals(now2);

  chronoUtils.freeze();
  const now3 = performance.now();
  const now4 = performance.now();
  expect(now3, 'frozen').equals(now4);

  chronoUtils.restore();
  const now5 = performance.now();
  const now6 = performance.now();
  expect(now5, 'restored').not().equals(now6);
}

export const freezesDate = async () => {
  const delayMs = 4;
  return new Promise<void>((resolve) => {
    const date1 = new Date();
    setTimeout(() => {
      const date2 = new Date();
      expect(date1, 'normal').not().equals(date2);
      setTimeout(() => {

        chronoUtils.freeze();
        const date3 = new Date();
        setTimeout(() => {
          const date4 = new Date();
          expect(date3, 'frozen').equals(date4);

          chronoUtils.restore();
          const date5 = new Date();

          setTimeout(() => {
            const date6 = new Date();
            expect(date6, 'restored').not().equals(date5);
            resolve();
          }, delayMs)

        }, delayMs);
      }, delayMs);
    }, delayMs);
  });
}