let state: number = 0;

export const setValue = (value: number) => {
  if (value < 0 || value > 1) throw new Error('Out of range. Expected 0 to 1');
  state = value;
  if (Math.random !== next) Math.random = next;
};

const next = () => {
  return state;
}