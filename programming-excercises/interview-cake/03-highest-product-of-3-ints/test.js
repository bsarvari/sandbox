var assert = require('assert');
// var getHighestProductOfThreeInts = require('./03-highest-product-of-3-ints');
var getHighestProductOfThreeInts = require('./03-highest-product-of-3-ints-simple');

describe('getHighestProductOfThreeInts', function() {
  it('should return 6 for [1, 2, 3]', function() {
    assert.equal(6, getHighestProductOfThreeInts([1, 2, 3]));
  });
  it('should pass for [1, 2, 3, 4]', function() {
    assert.equal(24, getHighestProductOfThreeInts([1, 2, 3, 4]));
  });
  it('should pass for [1, 0, 1, 2]', function() {
    assert.equal(2, getHighestProductOfThreeInts([1, 0, 1, 2]));
  });
  it('should pass for [-3, 1, 0, 1, 2]', function() {
    assert.equal(2, getHighestProductOfThreeInts([-3, 1, 0, 1, 2]));
  });
  it('should pass for [-3, -1, 0, 1, 2]', function() {
    assert.equal(6, getHighestProductOfThreeInts([-3, -1, 0, 1, 2]));
  });
  it('should pass for [0, 0, 0]', function() {
    assert.equal(0, getHighestProductOfThreeInts([0, 0, 0]));
  });
  it('should pass for [0, 0, 0, -1]', function() {
    assert.equal(0, getHighestProductOfThreeInts([0, 0, 0, -1]));
  });
  it('should pass for [-9, 8, -7, 6]', function() {
    assert.equal(-9 * 8 * -7, getHighestProductOfThreeInts([-9, 8, -7, 6]));
  });
  it('should pass for [-9, -8, -7, 6]', function() {
    assert.equal(-9 * -8 * 6, getHighestProductOfThreeInts([-9, -8, -7, 6]));
  });
});