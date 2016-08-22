var assert = require('assert');
var isPalindrome = require('./check-if-palindrome');

describe('isPalindrome', function() {
  it('should return true for ""', function() {
    assert.equal(true, isPalindrome(""));
  });
  it('should return true for "1"', function() {
    assert.equal(true, isPalindrome("1"));
  });
  it('should return true for "11"', function() {
    assert.equal(true, isPalindrome("11"));
  });
  it('should return false for "112"', function() {
    assert.equal(false, isPalindrome("112"));
  });
  it('should return true for "Adósom a mosoda."', function() { // Adósom a mosoda.
    assert.equal(true, isPalindrome("adosomamosoda"));
  });
  it('should return true for "A kultúra rút luka"', function() { // A kultúra rút luka :)
    assert.equal(true, isPalindrome("akulturarutluka"));
  });
});