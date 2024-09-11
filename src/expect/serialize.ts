export const serialize = (value: any) => JSON.stringify(value, replacer, '  ');

const serializeChild = (value: any) => JSON.stringify(value, replacer, '');

function replacer(this: any, key: string, value: any): any {
  if (value === null || value === undefined) return value;
  if (typeof value === 'object' || typeof value === 'function') {
    if ('toJSON' in value && typeof value.toJSON === 'function') {
      return value;
    }
  }
  if (typeof value === 'object') {
    if (value instanceof Error) {
      let cause;
      if (value.cause) {
        cause = serializeChild(value.cause);
        return `${value.constructor.name}: ${value.message} (cause: ${cause})`;
      } else {
        return `${value.constructor.name}: ${value.message}`;
      }
    }
    const name = value?.constructor?.name;
    if (Array.isArray(value)) {
      if (name === [].constructor.name)
        return value;
      return `[array ${name}] ${serializeChild(Array.from(value))}`;
    }
    if (name && name !== 'Object') {
      return `[object ${name}]`;
    }
  }
  if (typeof value === 'function') {
    let name = value.name;
    if ((name ?? '') === '') return '[Function (anonymous)]';
    return `[Function ${name}]`;
  }
  return value;
};
