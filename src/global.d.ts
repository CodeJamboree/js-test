import fs from 'fs';

type SetupName = 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll';

type SetupFunction = () => void | Promise<void>;

type SuiteSetup = Partial<Record<SetupName, SetupFunction>>;

export interface TestRunOptions extends SuiteSetup {
  folderPath: fs.PathLike,
  testFilePattern: RegExp,
  testFileReplacement: string | ((substring: string, ...args: any[]) => string),
  excessTests: number,
  beforeSuite?: SetupFunction,
  afterSuite?: SetupFunction,
  timeoutMs?: number,
  failFast?: boolean,
  randomOrder?: boolean
}
interface TestState extends TestResult {
  parents: string[],
  index: number,
  siblings: number,
}
interface TestResult {
  name: string,
  error?: unknown,
  filePath: string
}

export interface Results {
  total: number,
  passed: number,
  failed: number,
  skipped: number,
  failures: TestResult[],
}

interface RunningState extends Results {
  hasFocused: boolean,
  excessTests: number,
  parents: string[],
  beforeAll?: SetupFunction,
  beforeSuite?: SetupFunction,
  beforeEach?: SetupFunction,
  afterEach?: SetupFunction,
  afterSuite?: SetupFunction,
  afterAll?: SetupFunction,
  timeoutMs: number,
  failFast: boolean,
  failures: TestState[],
  randomOrder: boolean
}
type SuiteInfo = {
  focused?: boolean
  runnable: number
}
export type Entry<T> = [key: string, value: T];
export type Entries<T> = Entry<T>[];

interface TestSuite extends SuiteInfo {
  setup: SuiteSetup,
  tests: Entries<TestFunction>,
  filePath: string
}
interface TestSuites extends SuiteInfo {
  suites: Entries<TestSuite>
}

interface TestFunction<T extends (...args: any[]) => any = (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  timeoutMs?: number;
  focus?: boolean;
  skip?: boolean;
  testCases?: Parameters<T>[];
  testCaseIndex?: number;
  before?: SetupFunction,
  after?: SetupFunction
}