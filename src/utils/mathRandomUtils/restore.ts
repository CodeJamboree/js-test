import { originalRandom } from "./originalRandom.js";

export const restore = () => {
  Math.random = originalRandom;
}