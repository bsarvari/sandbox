'use strict';

function getHighestProductOfThreeInts(ints) {
  if (!ints || !ints.length || ints.length < 3) {
    throw 'Input array must be provided containing at least three integers.';
  }

  ints.sort(function (i1, i2) {
    return i2 - i1;
  });

  return Math.max(ints[0] * ints[1] * ints[2], ints[0] * ints[ints.length - 1] * ints[ints.length - 2]);
}

module.exports = getHighestProductOfThreeInts;