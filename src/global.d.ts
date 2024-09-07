import fs from 'fs';

type SetupName = 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll';

type SuiteSetup = Partial<Record<SetupName, Function>>;

export interface TestRunOptions extends SuiteSetup {
  folderPath: fs.PathLike,
  testFilePattern: RegExp,
  testFileReplacement: string | ((substring: string, ...args: any[]) => string),
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

interface RunningState {
  passed: number,
  failed: number,
  skipped: number,
  failures: TestInfo[],
  hasFocused: boolean,
  excessTests: number,
  parents: string[],
  beforeAll?: Function,
  beforeSuite?: Function,
  beforeEach?: Function,
  afterEach?: Function,
  afterSuite?: Function,
  afterAll?: Function
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
