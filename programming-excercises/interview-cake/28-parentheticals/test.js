'use strict';
var assert = require('assert');
var getClosingParenthesisPosition = require('./28-parentheticals');

describe('getClosingParenthesisPosition', function() {
  var inputStr = "Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.";
  it('should return 79 for input (10, '+inputStr+')', function() {
    assert.equal(79, getClosingParenthesisPosition(10, inputStr));
  });
  it('should return 3 for input (2, "((()(()))())")', function() {
    assert.equal(3, getClosingParenthesisPosition(2, "((()(()))())"));
  });
  it('should return 3 for input (2, "((()(()))())")', function() {
    assert.equal(8, getClosingParenthesisPosition(1, "((()(()))())"));
  });
  it('should return 7 for input (4, "((()(()))())")', function() {
    assert.equal(7, getClosingParenthesisPosition(4, "((()(()))())"));
  });
});