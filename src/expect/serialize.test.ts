import { expect } from "./expect.js";
import { serialize } from "./serialize.js";

export const simpleObject = () => {
  console.log(serialize({ foo: 'bar' }));
  expect(serialize({ foo: 'bar' })).equals(`{
  "foo": "bar"
}`);
}

export const functionToJson = () => {
  const myFunction = () => { };
  myFunction.toJSON = () => 'A custom value';
  expect(serialize(myFunction)).equals(`"A custom value"`);
}

export const namedFunction = () => {
  const myFunction = () => { };
  expect(serialize(myFunction)).equals(`"[Function myFunction]"`);
}

export const anonymousFunction = () => {
  expect(serialize(() => { })).equals(`"[Function (anonymous)]"`);
}

export const error = () => {
  const err = new Error('My Error');
  expect(serialize(err)).equals(`"Error: My Error"`);
}

export const errorWithCause = () => {
  const err = new Error('My Error', { cause: new Error('The Source') });
  expect(serialize(err)).equals(`"Error: My Error (cause: \\\"Error: The Source\\\")"`);
}

export const errorWithNestedCause = () => {
  const err1 = new Error("Err1");
  const err2 = new Error("Err2", { cause: err1 });
  const err3 = new Error("Err3", { cause: err2 })
  expect(serialize(err3)).equals(`"Error: Err3 (cause: \\\"Error: Err2 (cause: \\\\\\"Error: Err1\\\\\\")\\\")"`);
}

class TestExtendedError extends Error { };

export const extendedError = () => {
  const err = new TestExtendedError('My Extended Error');
  expect(serialize(err)).equals(`"TestExtendedError: My Extended Error"`);
}

class CustomObject { };

export const instantiated = () => {
  const obj = new CustomObject();
  expect(serialize(obj)).equals(`"[object CustomObject]"`);
}

export const instantiatedToJson = () => {
  const url = new URL('https://localhost');
  expect(serialize(url)).equals(`"https://localhost/"`);
}

export const array = () => {
  const ary = [1, 2, 3];
  expect(serialize(ary)).equals('[\n  1,\n  2,\n  3\n]');
}
class CustomArray extends Array { }

export const customArray = () => {
  const ary = new CustomArray();
  ary.push(1, 2, 3);
  expect(serialize(ary)).equals('"[array CustomArray] [1,2,3]"');
}