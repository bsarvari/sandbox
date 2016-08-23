# Check if a string is a palindrome

## The challenge
Make a js function to check if a string is a palindrome. Solution must contain at most 80 characters. 

## Solution
Reverse the string and compare it with the original.

The below solution is 76 chars and comes at a high price: lack of readability.
```javascript
function x(s){var r='',i=s.length;while(i){r+=s.charAt(i-1);i--}return r==s}
```

### Cost
`n` is the length of the input string
* processing: `O(n)`, because we iterate through the input to create the reversed string
* space: `O(n)`, because we create a string with the same length as the input.