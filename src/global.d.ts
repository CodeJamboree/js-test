import fs from 'fs';

type SetupName = 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll';

type SuiteSetup = Partial<Record<SetupName, Function>>;

export interface TestRunOptions extends SuiteSetup {
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
