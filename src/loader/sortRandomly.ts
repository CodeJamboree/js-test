export const sortRandomly = (values: any[]) => {
  if (values.length < 2) return values;
  const length = values.length;
  const random = new Uint32Array(length);
  crypto.getRandomValues(random);
  return values.sort((a, b) =>
    random[values.indexOf(a)] - random[values.indexOf(b)]
  );
}