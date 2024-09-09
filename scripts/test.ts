import { run } from "../src/index.js";

const main = async () =>
  await run({
    folderPath: 'build/src',
    testFilePattern: /([xf]_)?(.*)\.test\.js$/,
    testFileReplacement: '$2',
    timeoutMs: 1000,
    failFast: true
  });


try {
  console.info('Test')
  main()
    .then(() => {
      console.log('test run completed.');
    })
    .catch(e => console.error(e))
    .finally(() => {
      console.info('done');
    });
} catch (e) {
  console.error(e);
  console.info('done');
}
