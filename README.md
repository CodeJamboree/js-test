# js-test

A simple test platform.

* Run tests
  * Mark tests as skipped
  * Mark tests as focused
  * Setup/Teardown individual and entire tests
* Expectation helper
* Mock functions
* Spy & Fake standard output writes
* Spy & Fake standard error writes
* Fake date creation

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
  expect(target).above("100");
  expect(target).below("150");
  expect(target).within("100", "150");
  expect(target).isFunction(); // error
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
Negate method swaps expectations.
```js
export const test = () => {
  const target = "123";

  expect(target).not().is(123);
  expect(target).not().equals("432");
  expect(target).not().above("150");
  expect(target).not().below("100");
  expect(target).not().within("200", "250");
  expect(target).not().isFunction();
  expect(target).not().lengthOf(42);
  expect(target).not().startsWith("3");
  expect(target).not().endsWith("1");
  expect(target).not().includes("9");
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

# Date Utility

Freeze time in place, or set it to a specific time.
```js
import { expect, dateUtils } from '@codejamboree/js-test';

export const afterEach = () => {
  dateUtils.restore();
}

export const timeFrozen = async () => {
  dateUtils.freeze();
  return new Promise((resolve) => {
    const date = new Date();
    setTimeout(() => {
      expect(date.getTime()).is(new Date().getTime());
      resolve();
    }, 100);
  });
}

export const customTime = async () => {
  dateUtils.set(Date.UTC(1975, 4, 28, 3, 15, 1, 184));
  expect(new Date().toISOString()).is('1975-05-28T03:15:01.184Z');
}

export const timeRestored = () => {
  dateUtils.set(Date.UTC(1975, 4, 28, 3, 15, 1, 184));

  expect(new Date()).instanceOf('FakeDate');
  expect(new Date().toISOString()).is('1975-05-28T03:15:01.184Z');

  dateUtils.restore();
  
  expect(new Date()).not().instanceOf('FakeDate');
  expect(new Date().toISOString()).not().is('1975-05-28T03:15:01.184Z');
}
```
# Standard Utility

Inspect write arguments to the standard output & standard error, and prevent them from being written.

```js
import { expect, standardUtils } from '@codejamboree/js-test';

export const afterEach = () => {
  standardUtils.restore();
}

export const test = () => {
  console.log("You can see me");

  standardUtils.skipWrite();
  console.log("You can't see me");

  standardUtils.spy();
  console.log("Hidden 1");
  console.warn("Hidden 2");

  expect(standardUtils.writes(), 'spied').equals([
    'Hidden 1\n',
    "\u001b[33mHidden 2\u001b[39m\n"
  ]);
  expect(standardUtils.writeAt(0), 'start 1')
    .is('Hidden 1\n');
  expect(standardUtils.writeAt(1), 'start 2')
    .is("\u001b[33mHidden 2\u001b[39m\n");

  expect(standardUtils.typeAt(0)).is('standard');
  expect(standardUtils.typeAt(1)).is('error');

  standardUtils.unspy();
  console.log('Still hidden');
  expect(standardUtils.writeAt(-1), 'last')
    .is("\u001b[33mHidden 2\u001b[39m\n");

  standardUtils.allowWrite();
  console.log("You can see me again!");
  expect(standardUtils.writes(), 'all writes').equals([
    'Hidden 1\n',
    "\u001b[33mHidden 2\u001b[39m\n"
  ]);

  standardUtils.clearCaptured();
  expect(standardUtils.writes(), 'writes').equals([]);

}
```
