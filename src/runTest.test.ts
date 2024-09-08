
// Note: Always fails. For manual testing only.
export const x_f_overrideTimeout = async () => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Was not timed out by test runner.');
  }, 100);
});
x_f_overrideTimeout.timeoutMs = 1;

export const infiniteTimout = () => { }
infiniteTimout.timeoutMs = Infinity;

export const signed32intOverflowTimout = () => { }
signed32intOverflowTimout.timeoutMs = 0x7FFFFFFF + 1;

export const negativeTimout = () => { }
negativeTimout.timeoutMs = -1;
