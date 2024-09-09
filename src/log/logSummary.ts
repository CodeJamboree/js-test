import { RunningState } from "../global";

export const logSummary = (state: RunningState) => {
  const {
    total,
    passed,
    failed,
    skipped,
    failures
  } = state;

  if (total !== passed + failed + skipped) {
    console.error('Test run aborted');
  }

  if (failures.length > 0) {
    console.group('Failures');
    let lastParent = '';
    failures.forEach(({ parents, name }) => {
      let path = parents.join('/');
      if (lastParent !== path) {
        lastParent = path;
        console.groupEnd();
        console.group(lastParent);
      }
      console.error(name);
    });
    console.groupEnd();
  }

  if (passed + failed + skipped === 0) {
    console.error('No tests present');
  }
  if (passed !== 0) {
    console.info('Passed:', passed);
  }
  if (failed !== 0) {
    console.error('Failed:', failed);
  }
  if (skipped !== 0) {
    console.warn('Skipped:', skipped);
  }
  console.debug('Total:', total);
}