import { expect } from '../../expect/expect.js';
import { set } from './set.js';
import { restore } from './restore.js';
import { FakeDate } from './FakeDate.js';

const delayMs = 10;

export const afterEach = () => {
  restore();
}
export const changesDate = () => {
  set(0);
  expect(new Date()).instanceOf(Date);
  expect(new Date()).instanceOf(FakeDate);
}
export const originalDatePresent = () => {
  expect(new Date()).instanceOf(Date);
  expect(new Date()).not().instanceOf(FakeDate);
}
export const setEpoc = () => {
  set(0);
  expect(new Date().getTime()).is(0);
  expect(Date.now()).is(0);
}
export const setCustomTime = () => {
  set(123);
  expect(new Date().getTime()).is(123);
  expect(Date.now()).is(123);
}
export const setYmdUTC = () => {
  set(Date.UTC(1975, 4, 28, 3, 15, 1, 184));
  expect(new Date().getUTCFullYear()).is(1975);
  expect(new Date().getUTCMonth()).is(4);
  expect(new Date().getUTCDate()).is(28);
  expect(new Date().getUTCHours()).is(3);
  expect(new Date().getUTCMinutes()).is(15);
  expect(new Date().getUTCSeconds()).is(1);
  expect(new Date().getUTCMilliseconds()).is(184);
}
export const setYmd = () => {
  set(1975, 4, 28, 3, 15, 1, 184);
  expect(new Date().getFullYear()).is(1975);
  expect(new Date().getMonth()).is(4);
  expect(new Date().getDate()).is(28);
  expect(new Date().getHours()).is(3);
  expect(new Date().getMinutes()).is(15);
  expect(new Date().getSeconds()).is(1);
  expect(new Date().getMilliseconds()).is(184);
}

export const NoTimePasses = async () => {
  return new Promise<void>((resolve) => {

    set(123);
    setTimeout(() => {

      expect(new Date().getTime()).is(123);
      restore();

      resolve();

    }, delayMs);

  });
}
NoTimePasses.timeoutMs = delayMs + 10;

export const timePassesIfNotSet = async () => {
  return new Promise<void>((resolve) => {

    const time = new Date().getTime();

    setTimeout(() => {

      expect(new Date().getTime()).above(time);
      restore();

      resolve();

    }, delayMs);

  });
}
timePassesIfNotSet.timeoutMs = delayMs + 10;

export const timeRestored = () => {
  set(Date.UTC(1975, 4, 28, 3, 15, 1, 184));

  expect(new Date()).instanceOf('FakeDate');
  expect(new Date().toISOString()).is('1975-05-28T03:15:01.184Z');

  restore();

  expect(new Date()).not().instanceOf('FakeDate');
  expect(new Date().toISOString()).not().is('1975-05-28T03:15:01.184Z');
}