'use strict';

function getHighestProductOfThreeInts(ints){
  if(!ints || !ints.length || ints.length < 3){
    throw 'Input array must be provided containing at least three integers.';
  }

  // l1 >= l2 >= l3 >= s3 >= s2 >= s1, l(x) >=0, s(x) < 0
  // l1 is largest positive, s1 is smallest negative
  // these variables are used to gather largest positives and smallest negatives
  var l1, l2, l3, s3, s2, s1;

  function gatherLargestPositivesAndZeros() {
    if (l1 === undefined) {
      l1 = ints[n];
    } else { // l1 is already populated
      if (l1 > ints[n]) {
        if (l2 === undefined) {
          l2 = ints[n];

        } else { // l2 is already populated
          if (l2 > ints[n]) {
            l3 = l3 === undefined ? ints[n] : (ints[n] > l3 ? ints[n] : l3);

          } else { // l2 <= ints[n]
            l3 = l2;
            l2 = ints[n];
          }
        }
      } else { // l1 <= ints[n]
        l3 = l2;
        l2 = l1;
        l1 = ints[n];
      }
    }
  }

  function gatherSmallestNegatives() {
    if (s1 === undefined) {
      s1 = ints[n];
    } else { // s1 is already populated
      if (s1 < ints[n]) {
        if (s2 === undefined) {
          s2 = ints[n];

        } else { // s2 is already populated
          if (s2 < ints[n]) {
            s3 = s3 === undefined ? ints[n] : (ints[n] > s3 ? ints[n] : s3);

          } else { // s2 >= ints[n]
            s3 = s2;
            s2 = ints[n];
          }
        }
      } else { // l1 <= ints[n]
        s3 = s2;
        s2 = s1;
        s1 = ints[n];
      }
    }
  }

  for(var n=0; n<ints.length; n++){
    if (ints[n] >= 0) {
      gatherLargestPositivesAndZeros();
    } else { // ints[n] < 0, filling up l(x) variables
      gatherSmallestNegatives();
    }
  }
  var c = []; // contributors
  if(l1 !== undefined) c.push(l1);
  if(l2 !== undefined) c.push(l2);
  if(l3 !== undefined) c.push(l3);
  if(s3 !== undefined) c.push(s3);
  if(s2 !== undefined) c.push(s2);
  if(s1 !== undefined) c.push(s1);

  if(c.length == 3){
    return c[0] * c[1] * c[2];
  } else {
    // making all possible combinations for a set of maximum 6 integers, where the size of the combination is 3.
    // (n 3) results in at most 20 combinations if n=6, and less if n<6, which is an affordable price
    var largest = -Infinity; // largest possible product of the three smallest negative and three largest positive or zero ints
    for(var x=0; x< c.length; x++){
      for(var y=x+1; y< c.length; y++){
        for(var z=y+1; z< c.length; z++){
          var candidate = c[x] * c[y] * c[z];
          largest = largest > candidate ? largest : candidate;
        }
      }
    }
    return largest;
  }
}

module.exports = getHighestProductOfThreeInts;