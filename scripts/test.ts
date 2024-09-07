import { run } from "../src/run.js";

try {
  console.info('Test')
  run({
    testFilePattern: /\.test\.js$/,
    testFileReplacement: '',
    folderPath: 'build/src'
  })
    .catch(e => console.error(e))
    .finally(() => {
      console.info('done');
    });
} catch (e) {
  console.error(e);
  console.info('done');
}
