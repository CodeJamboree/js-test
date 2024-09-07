# js-test

A simple test platform.

* Run tests
  * Mark tests as skipped
  * Mark tests as focused
  * Setup/Teardown individual and entire tests
* Expectation helper
* Mock functions
* Mock stdout

# Running tests

The following will find all files in the `build/src` folder that end with `.test.js`, and run them.

```js
import { run } from '@codejamboree/js-test';

run({
  folderPath: 'build/src',
  testFilePattern: /\.test\.js$/
}).then(() => {
  console.log('done');
})
```

Setup and tear down the entire test run, individual modules, or individual tests.

```js
import { run } from '@codejamboree/js-test';

run({
  folderPath: 'build/src',
  testFilePattern: /\.test\.js$/,
  beforeAll: () => {
    // I run before any test in the whole test-run begins
  },
  beforeSuite: () => {
    // I run before any of the tests in a module runs
  },
  beforeEach: () => {
    // I run before each test runs
  },
  afterEach: () => {
    // I run after each test completes
  },
  afterSuite: () => {
    // I run after all tests in a moudle completes
  },
  afterAll: () => {
    // I run after all tests in the entire project completes
  }
}).then(() => {
  console.log('done');
})
```

Modify displayed file names

```js
run({
  folderPath: 'build/src',
  testFilePattern: /\.test\.js$/,
  testFileReplacement: ''
})
// File: isSkippedName.test.js
// Displayed: isSkippedName

run({
  folderPath: 'build/src',
  testFilePattern: /$([xf]_)?(.*)\.test\.js$/,
  testFileReplacement: '$2'
})
// File: x_isSkippedName.test.js
// File: f_isSkippedName.test.js
// File: isSkippedName.test.js
// Displayed: isSkippedName
```

A test suite runs all exported functions.
```js
export const test1 = () => {
  let a = 1 + 2;
}
export const failingTest = () => {
  throw new Error('I have my reasons');
}
export const asyncTest = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 100);
  });
}
```

Special methods are ran before/after each test, or the entire set of tests if present.
```js
export const beforeAll = () => {
  // Ran once before all tests in the file
}
export const beforeEach = () => {
  // Ran before each test
}
export const afterEach = () => {
  // Ran after each test
}
export const afterAll = () => {
  // Ran after all tests in the file have completed
}
``` 

Tests can be ignored by preceeding the name with an x_
```js
export const runningTest = () => {
  // I will run
}
export const x_skippedTest = () => {
  // I will not run
}
```

Tests can be focused by preceeding the name with an f_, causing all other tests in the file, and entire project to be ignored.
```js
export const f_focusedTest = () => {
  // I will run
}
export const runningTest = () => {
  // I will not run
}
export const x_skippedTest = () => {
  // I will not run
}
```
Files that contain test may be renamed with `f_` and `x_` to focus and skip the entire suite of tests.

# Expectation

An expectation helper assists in commong checks.
```js
import { expect } from '@codejamboree/js-test';

export const test = () => {
  const target = "123";

  expect(target).is("123");
  expect(target).equals(123);
  expect(target).isFunction(); // error
  expect(target).isFunction(false);
  expect(target).lengthOf(3);
  expect(target).startsWith("1");
  expect(target).endsWith("3");
  expect(target).includes("2");
}
export const testInstance = () => {
  const target = new Date();
  expect(target).instanceOf(Date);
  expect(target).instanceOf('Date');
}
export const testErrors = () => {
  const message = 'This is an error';
  const customError = new Error(message);
  const target = () => {
    throw customError;
  };
  expect(target).toThrow();
  expect(target).toThrow(message);
  expect(target).toThrow(customError);
}
```
Additional details can help narrow down source of failure.
```js
export const test = () => {
  const target = "123";
  expect(target, 'checking is').is("123");
  expect(target, 'comparing equal').equals(123);
  expect(target, 'third check').isFunction(false);
}
```

# Mock Functions

Detect when functions were called, what they were called with, and control their response and behavior.

```js
import { expect, mockFunction } from '@codejamboree/js-test';

export const test = () => {
  const target = mockFunction();

  target("apple", "banana");
  target("pizza");

  expect(target.called()).is(true);
  expect(target.callCount()).is(2);
  expect(target.callAt(0)).equals(["apple", "banana"]);
  expect(target.callArg(1, 0)).is("pizza");
}
export const testValue = () => {
  const target = mockFunction();
  target.returns("pickles");
  const value = target();
  expect(value).is("pickles");
}
export const testLogic = () => {
  const target = mockFunction(
    (food) => {
      return `I like ${food}`;
    }
  );
  const value = target("snacks");
  expect(value).is("I like snacks");
}
```

# Mock Stdout

Capture the underlying stream of the console log and hide the output.

```js
import { expect, mockStdout } from '@codejamboree/js-test';

export const beforeEach = () => {
  console.log('About to hide...');
  mockStdout.clearCaptured();
  mockStdout.hideLogs();
  mockStdout.startCapture();
}
export const afterEach = () => {
  mockStdout.showLogs();
  mockStdout.stopCapture();
  console.log('You can see this now');
}

export const test = () => {
  console.log("Helow Yello");
  expect(mockStdout.at(0)).is('Helow Yello\n');
}
export const testLast = () => {
  console.log("Helow Yello 1");
  console.log("Helow Yello 2");
  console.log("Helow Yello 3");
  expect(mockStdout.at(-1)).is('Helow Yello 3\n');
}
```