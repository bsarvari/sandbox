'use strict';
/*
 Each column of the matrices below contains the indices of the input array elements whose products will be stored
 in the output array.
[0, 1, 2]
 -  0  0
 1  -  1
 2  2  -

[0, 1, 2, 3, 4]
 -  0  0  0  0
 1  -  1  1  1
 2  2  -  2  2
 3  3  3  -  3
 4  4  4  4  -

 */

// variable costs: n + 5
// computational cost: O(n)
function getProductsOfAllIntsExceptAtIndex(ints){
  var prods = [];
  if(ints.length <= 2) {
    throw 'Input array must have at least three elements';

  } else if(ints.length > 2) {
    var length = ints.length;
    var prodToRight = ints[0]; // product of numbers as we traverse the array from left to right
    var prodToLeft = ints[length-1]; // product of numbers as we traverse the array from right to left
    for(var n=1, m=length-1; n<length-1; n++){
      prods[n] = prods[n] === undefined ? prodToRight : prods[n] * prodToRight;
      prodToRight = prodToRight * ints[n];

      prods[m-1] = prods[m-1] === undefined ? prodToLeft : prods[m-1] * prodToLeft;
      prodToLeft = prodToLeft * ints[m-1];
      m--;
    }
    prods[length-1] = prodToRight;
    prods[0] = prodToLeft;
  }

  return prods;
}

module.exports = getProductsOfAllIntsExceptAtIndex;

/**
 * Another possible solution that has O(2n) cost because it walks through the input array twice.
 * This is avoidable by the solution above.
 */
function calc(ints){
  var prods = [];
  if(ints.length <1 ){
    throw 'invalid length';
  } else if(ints.length == 2) {

  } else if(ints.length > 2) {
    var prod = ints[0];
    for(var n=1; n<ints.length; n++){
      prods[n] = prod;
      prod = prod * ints[n];
    }

    prod = ints[ints.length-1];
    for(n=ints.length-1; n > 0; n--){
      prods[n-1] = prods[n-1] === undefined ? prod : prods[n-1] * prod;
      prod = prod * ints[n-1];
    }
  }

  return prods;
}

console.log(getProductsOfAllIntsExceptAtIndex([1, 2, 3, 4, 1]).join());