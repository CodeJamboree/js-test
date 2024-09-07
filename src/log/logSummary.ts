import { RunningState } from "../global";

export const logSummary = (state: RunningState) => {
  const {
    passed,
    failed,
    skipped,
    failures
  } = state;

  if (failures.length > 0) {
    console.group('Failures');
    let lastParent = '';
    failures.forEach(failure => {
      let parent = failure.parents.join('/');
      if (parent !== lastParent) {
        lastParent = parent;
        console.groupEnd();
        console.group(parent);
      }
      console.error(failure.name);
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
  console.debug('Total:', passed + failed + skipped);
}