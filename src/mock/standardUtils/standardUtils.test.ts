import { standardUtils } from "./standardUtils.js";
import { expect } from "../../index.js";

export const afterEach = () => {
  standardUtils.restore();
}

export const test = () => {
  console.log("You can see me");

  standardUtils.skipWrite();
  console.log("You can't see me");

  standardUtils.spy();
  console.log("Hidden 1");
  console.warn("Hidden 2");

  expect(standardUtils.writes(), 'spied').equals([
    'Hidden 1\n',
    "\u001b[33mHidden 2\u001b[39m\n"
  ]);
  expect(standardUtils.writeAt(0), 'start 1')
    .is('Hidden 1\n');
  expect(standardUtils.writeAt(1), 'start 2')
    .is("\u001b[33mHidden 2\u001b[39m\n");

  expect(standardUtils.typeAt(0)).is('standard');
  expect(standardUtils.typeAt(1)).is('error')

  standardUtils.unspy();
  console.log('Still hidden');
  expect(standardUtils.writeAt(-1), 'last')
    .is("\u001b[33mHidden 2\u001b[39m\n");

  standardUtils.allowWrite();
  console.log("You can see me again!");
  expect(standardUtils.writes(), 'all writes').equals([
    'Hidden 1\n',
    "\u001b[33mHidden 2\u001b[39m\n"
  ]);

  standardUtils.clearCaptured();
  expect(standardUtils.writes(), 'writes').equals([]);

}
