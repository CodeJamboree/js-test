export const set = (ms: number) => {
  const customNow = () => {
    return ms;
  }
  performance.now = customNow;
}
