var assert = require('assert');
var stocks = require('./01-apple-stocks');
var simplifiedStocks = require('./01-apple-stocks-simplified');

describe('Stock dealer', function() {
  describe('#getBestDeal', function() {
    it('should return 0 for [100, 80, 78, 6, 5, 4, 1, 1]', function() {
      var prices = [100, 80, 78, 6, 5, 4, 1, 1];
      var bestDeal = new stocks.Dealer(prices).getBestDeal();
      assert.equal(0, bestDeal.getProfit());
      assert.equal(1, bestDeal.getBuyPrice());
      assert.equal(1, bestDeal.getSellPrice());
    });
  });
  describe('#getBestDeal', function() {
    it('should return 6 for [10, 7, 5, 8, 11, 9]', function() {
      var prices = [10, 7, 5, 8, 11, 9];
      var bestDeal = new stocks.Dealer(prices).getBestDeal();
      assert.equal(6, bestDeal.getProfit());
      assert.equal(5, bestDeal.getBuyPrice());
      assert.equal(11, bestDeal.getSellPrice());
    });
  });
});

describe('Simplified stock dealer', function() {
  describe('#getBestDeal', function() {
    it('should return 0 for [100, 80, 78, 6, 5, 4, 1, 1]', function() {
      var prices = [100, 80, 78, 6, 5, 4, 1, 1];
      var bestDeal = new simplifiedStocks.Dealer(prices).getBestDeal();
      assert.equal(0, bestDeal);
    });
  });
  describe('#getBestDeal', function() {
    it('should return 6 for [10, 7, 5, 8, 11, 9]', function() {
      var prices = [10, 7, 5, 8, 11, 9];
      var bestDeal = new simplifiedStocks.Dealer(prices).getBestDeal();
      assert.equal(6, bestDeal);
    });
  });
});
