const primeModulus = 2 ** 31 - 1;
const multiplier = 16807;

let state: number = 0;

export const prng = (seed: number) => {
  state = seed % primeModulus;
  if (state <= 0) state += (primeModulus - 1);
  if (Math.random !== next)
    Math.random = next;
};

const next = () => {
  state *= multiplier;
  state %= primeModulus;
  return state / primeModulus;
}