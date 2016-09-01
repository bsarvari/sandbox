/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';

export default function expectError(fn, errorConstructor, expectedMsg) {
  // This isn't the most elegant but I can't make the chai throw API behave as expected
  try{
    fn();
  } catch (e){
    if(errorConstructor){
      expect(e).to.be.an.instanceof(errorConstructor);
    }
    if(expectedMsg){
      expect(e.message).to.equal(expectedMsg);
    }
    return;
  }

  throw new Error('Expected a '+errorConstructor+' to be thrown, but nothing was.');
}
