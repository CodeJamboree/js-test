
// Note: Must be ignored, otherwise tests will never pass as a whole
export const x_f_overrideTimeout = async () => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Was not timed out by test runner.');
  }, 100);
});
x_f_overrideTimeout.timeoutMs = 1;