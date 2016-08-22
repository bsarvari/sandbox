'use strict';
/*
Examples:
non-palindrome: '12'
palindrome: '1221', '121', '1'
 */

function isPalindrome(str){
  var rev = '',
    i = str.length;
  while(i){
    rev+=str.charAt(i-1);
    i--;
  }
  return rev == str;
}

/**
 * The below solution is 76 chars and comes at a high price: lack of readability.
 */
// function x(s){var r='',i=s.length;while(i){r+=s.charAt(i-1);i--}return r==s}

module.exports = isPalindrome;