# js-test

A simple test platform.

* Run tests
  * Mark tests as skipped
  * Mark tests as focused
  * Setup/Teardown individual and entire tests
* Expectation helper
* Mock functions
* Spy & Fake standard output/error writes
* Fake date creation
* Fake performance now
* Fake process hrtime
* Fake random values
* Fake http/https request

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
{
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
}
```

Other options are available, as well as the final results are returned.

```js
import { run } from '@codejamboree/js-test';

run({
  folderPath: 'build/src',
  testFilePattern: /$([xf]_)?(.*)\.test\.js$/,
  testFileReplacement: '$2', // replacer for filename pattern
  timeoutMs: 10000, // Limit time for tests to run
  failFast: true // Stop all testing once a test fails
}).then(results => {
  console.log('Failed', results.failed);
  console.log('Passed', results.passed);
  console.log('Skipped', results.skipped);
  console.log('Total', results.total);
  results.failures.forEach(failure => {
    console.group(failure.name);
    console.log('File', failure.filePath);
    console.log('Error', failure.error);
    console.groupEnd();
  });
})
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
asyncTest.timeoutMs = 200; // override timeout
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
# Performance Utility

Fake performance now.
```js

export const test = () => {
  performanceUtils.freeze();
  const now1 = performance.now();
  const now2 = performance.now();
  expect(now1).is(now2);

  performanceUtils.set(123);
  expect(performance.now()).is(123);

  performanceUtils.restore();
  const now3 = performance.now();
  const now4 = performance.now();
  expect(now3).not().equals(now4);
}

```

# Process Utility

Fake process high-resolution time
```js
export const testFrozen = () => {
  standardUtils.spyAndHide();
  processUtils.freeze();
  console.time(label);
  console.timeEnd(label);
  expect(standardUtils.writeAt(-1)).equals(`${label}: 0ms\n`);
  processUtils.restore();
  standardUtils.restore();
}
export const testCustom = () => {
  standardUtils.spyAndHide();
  processUtils.set([1.000, 0]);
  console.time(label);
  processUtils.set([1.001, 0]);
  console.timeEnd(label);
  expect(standardUtils.writeAt(-1)).equals(`${label}: 1ms\n`);
  processUtils.restore();
  standardUtils.restore();
}
```

# Chrono Utility

Freeze time-based methods and objects

```js
export const test = () => {

  chronoUtils.freeze();

  const time1 = process.hrtime();
  const time2 = process.hrtime();
  expect(time1).equals(time2);

  const now1 = performance.now();
  const now2 = performance.now();
  expect(now1).equals(now2);

  const date1 = new Date();
  const date2 = new Date();
  expect(date1).equals(date2);

  chornoUtils.restore();
}
```

# Math Random Utility

Ensure "random" numbers are deterministic.

```js
// Psuedo Random Number Generator
mathRandomUtils.prng(8675309);
expect(Math.random()).is(0.8961716736183369);
expect(Math.random()).is(0.957318503389749);
expect(Math.random()).is(0.6520864715110913);

// Seed again
mathRandomUtils.prng(8675309);
expect(Math.random()).is(0.8961716736183369);

// Constant value
mathRandomUtils.setValue(0.3);
expect(Math.random()).is(0.3);
expect(Math.random()).is(0.3);

// List of values
mathRandomUtils.setValues([0.3, 0.7, 0.4]);
expect(Math.random()).is(0.3);
expect(Math.random()).is(0.7);
expect(Math.random()).is(0.4);
// Restarts at first value
expect(Math.random()).is(0.3);

// Custom function
let value = 0.3;
mathRandomUtils.setFunction(() => 0.1 + value);
expect(Math.random()).is(0.4);
value = 0.8;
expect(Math.random()).is(0.9);

// Cleanup
mathRandomUtils.restore();
```

# Http Utility

Mimic requests and responses from the http/https request methods.

NOTE: Some methods/logic are missing from FakeClientRequest and FakeIncomingMessage.

```js
export const afterEach = () => {
  httpUtils.restore();
}

export const status = async () => new Promise<void>((resolve, reject) => {
  httpUtils.setStatus(123, "The Status");
  const request = https.request("https://codejamboree.com");
  request.on('response', res => {
    expect(res.statusCode).is(123);
    expect(res.statusMessage).is('The Status');
    resolve();
  });
  request.on('error', reject);
  request.end();
});

export const chunks = async () => new Promise<void>((resolve) => {
  httpUtils.setChunks([
    'first',
    'second',
    'third'
  ]);
  /* As binary data
  httpUtils.setChunks([
    [ 0x66, 0x69, 0x72, 0x73, 0x74       ],
    [ 0x73, 0x65, 0x63, 0x6f, 0x6e, 0x64 ],
    [ 0x74, 0x68, 0x69, 0x72, 0x64       ]
  ]);
  */
  const chunksReceived: any[] = [];
  const request = https.request("https://codejamboree.com");
  request.on('response', res => {
    res.on('data', chunk => {
      chunksReceived.push(new TextDecoder().decode(chunk));
    });
    res.on('end', () => {
      expect(chunksReceived).equals([
        'first',
        'second',
        'third'
      ]);
      resolve();
    });
  });
  request.end();
});

export const callback = async () => new Promise<void>((resolve) => {
  httpUtils.mock();

  const callback = (res: http.IncomingMessage) => {
    res.on('end', () => {
      resolve();
    });
  };

  const request = https.request("https://codejamboree.com", callback);
  request.end();
});


export const postDataWithEncodedResponse = async () => new Promise<void>((resolve) => {
  httpUtils.mock();
  const responseData = JSON.stringify({ message: "Received!" });
  httpUtils.setResponseData(responseData);
  /* As binary data
  httpUtils.setResponseData([
    0x7b, 0x22, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67,
    0x65, 0x22, 0x3a, 0x20, 0x22, 0x52, 0x65, 0x63, 
    0x65, 0x69, 0x76, 0x65, 0x64, 0x21, 0x22, 0x7d
  ]);
  // 4 byte chunks
  httpUtils.setResponseData(responseData, 4);
  */

  const callback = (res: http.IncomingMessage) => {
    let receivedData: string = '';
    res.setEncoding('utf8');
    res.on('data', (chunk: string) => {
      receivedData += chunk;
    });
    res.on('end', () => {
      const parsed = JSON.parse(receivedData);
      expect(parsed.message).is('Received!');
      resolve();
    });
  };

  const url = new URL("https://codejamboree.com");

  const postData = JSON.stringify({ name: "Lewis Moten" });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }
  const request = https.request(options, callback);
  request.write(postData);
  request.end();
});
```