export const serialize = (value: any) => JSON.stringify(value, (key, value) => {
  if (value === null || value === undefined) return value;
  if (typeof value === 'object') {
    if (value instanceof Error) return `${value.constructor.name}: ${value.message}`;
    const name = value?.constructor?.name;
    if (name) {
      return `[object ${name}] ${value}`;
    }
  }
  if (typeof value === 'function') {
    let name = value.name;
    if ((name ?? '') === '') return '[Function (anonymous)]';
    return `[Function ${name}]`;
  }
  return value;
}, '  ');