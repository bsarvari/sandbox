# I like parentheticals (a lot).
"Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing."

Write a function that, given a sentence like the one above, along with the position of an opening parenthesis, finds the corresponding closing parenthesis.

Example: if the example string above is input with the number 10 (position of the first parenthesis), the output should be 79 (position of the last parenthesis).

## The solution
* Gather the position of the opening parenthesis characters in an array that serves as a LIFO queue.
* When encountering a closing parenthesis remove the last element from the LIFO.
* If the currently removed position equals to the input argument, we found the closing parenthesis. Return its position.

### Cost
* computation: `O(n)`, since we need to read the string char by char
* space: no more the length of the string for the positions of the opening parenthesises
