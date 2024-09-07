export const set = ([seconds, ns]: [number, number]) => {
  const customHrtime = (time?: [number, number]): [number, number] => {
    if (time) {
      const [lastSeconds, lastNs] = time;

      let deltaSeconds = seconds - lastSeconds;
      let deltaNs = ns - lastNs;

      if (deltaNs < 0) {
        deltaSeconds -= 1;
        deltaNs += 1e9;
      }

      return [deltaSeconds, deltaNs];
    } else {
      return [seconds, ns];
    }
  }
  customHrtime.bigint = () => (BigInt(seconds) * BigInt(1e9)) * BigInt(ns);
  process.hrtime = customHrtime;
}
