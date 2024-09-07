export const logExpectationData = (data: Record<string, any>) =>
  Object.entries(data).forEach(writeValue);

const writeValue = ([key, value]: [string, any]): void => {
  switch (key) {
    case 'expected':
    case 'expectedValue':
      console.info('Expected:', value);
      break;
    case 'actual':
    case 'actualValue':
      console.info('Actual:', value);
      break;
    case 'details':
      if (value !== undefined) {
        console.debug('Details:', value);
      }
      break;
    default:
      console.debug(`${key}:`, value);
  }
}