import { expect } from "../../expect/index.js";
import { prng } from "./prng.js";
import { restore } from "./restore.js";

export const afterEach = () => {
  restore();
}

export const jenny = () => {
  prng(8675309);
  const values = new Array(3)
    .fill(0)
    .map(() => Math.random());

  expect(values).equals([
    0.8961716736183369,
    0.957318503389749,
    0.6520864715110913
  ])
}

export const theAnswer = () => {
  prng(42);
  const values = new Array(3)
    .fill(0)
    .map(() => Math.random());

  expect(values).equals([
    0.00032870750889587566,
    0.5245871020129822,
    0.7354235321913956
  ])
}

export const zero = () => {
  prng(0);
  const values = new Array(3)
    .fill(0)
    .map(() => Math.random());

  expect(values).equals([
    0.9999921736307406,
    0.8684622118568338,
    0.24439467780496676
  ])
}

export const negative = () => {
  prng(-1);
  const values = new Array(3)
    .fill(0)
    .map(() => Math.random());

  expect(values).equals([
    0.9999843472614811,
    0.7369244237136675,
    0.48878935560993353
  ])
}