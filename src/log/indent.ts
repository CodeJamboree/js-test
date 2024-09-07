
// Indent is specifically to prevent altering tests that evaluate
// the stdout buffer. Otherwise console.group/groupEnd could be used.
export const indent = (depth: number, message: string): string => {
  let space = depth === 0 ? '' : ' '.repeat(depth * 2);
  return `${space}${message}`;
}