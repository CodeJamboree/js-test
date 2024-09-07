import fs from 'fs';

type SetupName = 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll';

type SuiteSetup = Partial<Record<SetupName, Function>>;

interface TestRunOptions extends SuiteSetup {
  folderPath: fs.PathLike,
  testFilePattern: RegExp,
  testFileReplacement: string,
  excessTests: number,
  beforeSuite?: Function,
  afterSuite?: Function,
}
interface TestInfo {
  parents: string[],
  name: string,
  index: number,
  siblings: number,
  error?: unknown
}
interface RunningState extends TestRunOptions {
  passed: number,
  failed: number,
  skipped: number,
  failures: Failure[],
  hasFocused: boolean,
  excessTests: number,
  parents: string[],
  beforeEach?: Function,
  afterEach?: Function
}
type SuiteInfo = {
  focused?: boolean
  runnable: number
}
type Entry<T> = [string, T];
type Entries<T> = Entry<T>[];

interface TestSuite extends SuiteInfo {
  setup: SuiteSetup,
  tests: Entries<Function>
}
interface TestSuites extends SuiteInfo {
  suites: Entries<TestSuite | TestSuites>
}

type SuiteOrSuites = TestSuite | TestSuites;

interface Expect<T> {
  actual: T,
  details?: any,
  equals: <T>(expected: T) => void
  is: <T>(expected: T) => void,
  isFunction: <T extends Function>(expected?: boolean) => void,
  includes: <T extends string | any[]>(expected: string | any) => void,
  instanceOf: <T extends Function | object>(expected: string | Function | object) => void,
  startsWith: <T extends string>(epected: string) => void,
  endsWith: <T extends string>(expected: string) => void,
  toThrow: <T extends Function>(error?: string | Error) => void,
  lengthOf: <T extends NonNullable<object> | string | Function>(expeced: number) => void
}
