export const getCallback = (args: writeArgs): callback | undefined => {
  const last = args.at(-1);
  if (typeof last === 'function') return last;
}
