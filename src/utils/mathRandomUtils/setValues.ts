let index: number = -1;
let lookup: number[] = [];

export const setValues = (values: number[]) => {
  if (values.length < 2) throw new Error(`Must have more than one value`);
  if (values.some(v => v < 0 || v > 1)) throw new Error('Out of range. Expected 0 to 1');
  index = -1;
  lookup = values.slice();
  if (Math.random !== next)
    Math.random = next;
};

const next = () => {
  index++;
  index %= lookup.length;
  return lookup[index];
};