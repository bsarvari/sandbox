var assert = require('assert');
var getProductsOfAllIntsExceptAtIndex = require('./02-product-of-ints');

describe('getProductsOfAllIntsExceptAtIndex', function() {
  it('should return [6, 3, 2] for [1, 2, 3]', function() {
    var prods = getProductsOfAllIntsExceptAtIndex([1, 2, 3]);
    assert.equal([6, 3, 2].join(), prods.join());
  });
  it('should return [84, 12, 28, 21] for [1, 7, 3, 4]', function() {
    var prods = getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]);
    assert.equal([84, 12, 28, 21].join(), prods.join());
  });
});