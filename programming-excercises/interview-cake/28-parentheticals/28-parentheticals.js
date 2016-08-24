'use strict';

function getClosingParenthesisPosition(openPos, str){
  /**
   * the positions where we find opening parenthesises. We use this as a LIFO. 
   * As soon as we encounter a closing parenthesis we remove the last element.
   * @type {Array}
   */
  var openPositions = [];
  for(var i=0; i<str.length; i++){
    if(str.charAt(i) == '('){
      openPositions.push(i);
    }
    if(str.charAt(i) == ')'){
      var matchedOpen = openPositions.pop();
      if(matchedOpen == openPos){
        return i;
      }
    }
  }
}

module.exports = getClosingParenthesisPosition;