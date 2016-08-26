'use strict';

function condenseMeetingTimes(meetings){
  var condensedMeetings = []; // condensed meetings
  function overlapping(m1, m2) {
    /*
      m1:     ----
      m2: ------------

      m1: ------------
      m2:     ----

      m1: -------
      m2:      -----

      m1:    -------
      m2: -----
     */

    return !!((m1.startTime >= m2.startTime && m1.endTime <= m2.endTime) ||
    (m2.startTime >= m1.startTime && m2.endTime <= m1.endTime) ||
    (m1.startTime <= m2.startTime && m1.endTime >= m2.startTime) ||
    (m2.startTime <= m1.startTime && m2.endTime >= m1.startTime));
  }
  var overlaps;
  for(var i=0; i<meetings.length; i++){
    if(condensedMeetings.length == 0){
      condensedMeetings.push(meetings[i]);
    } else {
      overlaps = [];
      for (var j=0; j<condensedMeetings.length; j++){
        if(overlapping(condensedMeetings[j], meetings[i])){
          overlaps.push(condensedMeetings[j]);
        }
      }
      if(overlaps.length > 0){
        var merged = overlaps[0];
        if(merged.startTime > meetings[i].startTime){
          merged.startTime = meetings[i].startTime;
        }
        var last = overlaps[overlaps.length-1];
        merged.endTime = last.endTime < meetings[i].endTime ? meetings[i].endTime : last.endTime;

        if(condensedMeetings.indexOf(merged) < condensedMeetings.length-1 && overlaps.length > 1){
          // removing only if merged is not the last and there are more than one overlapping condensed meetings
          condensedMeetings.splice(condensedMeetings.indexOf(merged)+1, overlaps.length);
        }
      } else { // not overlapping with any?
        condensedMeetings.push(meetings[i]);
      }
    }
  }
  return condensedMeetings;
}

module.exports = condenseMeetingTimes;