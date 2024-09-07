import { SetupName } from "../global";

const names = [
  'beforeEach',
  'beforeAll',
  'afterEach',
  'afterAll'
];
names.forEach(name => names.push(`x_${name}`));

export const isSetupName = (name: PropertyKey): name is SetupName => {
  return typeof name === 'string' && names.includes(name);
}