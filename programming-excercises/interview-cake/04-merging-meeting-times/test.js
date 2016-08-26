var assert = require('assert');
var condenseMeetingTimes = require('./04-merging-meeting-times');

describe('condenseMeetingTimes', function() {
  it('should pass -- 00', function() {
    assert.deepEqual([
      {startTime: 0, endTime: 1},
      {startTime: 3, endTime: 8},
      {startTime: 9, endTime: 12}
    ], condenseMeetingTimes([
      {startTime: 0,  endTime: 1},
      {startTime: 3,  endTime: 5},
      {startTime: 4,  endTime: 8},
      {startTime: 10, endTime: 12},
      {startTime: 9,  endTime: 10}
    ]));
  });
  it('should pass -- 01', function() {
    assert.deepEqual([
      {startTime: 0, endTime: 15}
    ], condenseMeetingTimes([
      {startTime: 0,  endTime: 1},
      {startTime: 3,  endTime: 5},
      {startTime: 4,  endTime: 8},
      {startTime: 10, endTime: 12},
      {startTime: 9,  endTime: 10},
      {startTime: 0,  endTime: 15}
    ]));
  });
  it('should pass -- 02', function() {
    assert.deepEqual([
      {startTime: 0, endTime: 3}
    ], condenseMeetingTimes([
      {startTime: 0,  endTime: 1},
      {startTime: 1,  endTime: 2},
      {startTime: 2,  endTime: 3}
    ]));
  });
  it('should pass -- 03', function() {
    assert.deepEqual([
      {startTime: 0, endTime: 3}
    ], condenseMeetingTimes([
      {startTime: 2,  endTime: 3},
      {startTime: 1,  endTime: 2},
      {startTime: 0,  endTime: 1}
    ]));
  });
  it('should pass -- 03', function() {
    assert.deepEqual([
      {startTime: 0, endTime: 3},
      {startTime: 5, endTime: 6}
    ], condenseMeetingTimes([
      {startTime: 2,  endTime: 3},
      {startTime: 1,  endTime: 2},
      {startTime: 0,  endTime: 1},
      {startTime: 5,  endTime: 6}
    ]));
  });
});