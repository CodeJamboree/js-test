export const setFunction = (callback: () => number) => {
  Math.random = callback
};