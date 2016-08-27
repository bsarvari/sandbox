# Given an arrayOfInts, find the highestProduct you can get from three of the integers.
There may be zeros and negative numbers as well as repetitions in the array. There are at least three integers in the array.

## The solution
### Brute force
Make all the possible combinations of the input integers such that each combination has three integers.
Make the product of each combination and return the largest one in the end.

This solution has a high price.

### Iterating through the input array only once
* Iterate through the input array and gather the three largest positive (including zeros) and the three smallest negative numbers. 
It will result at least three and at most six numbers. 
* Make all the combinations of three integers for the above list of possible factors and return the largest one.

### The best solution
Sort the input array and return the product of the first three integers or the product of the first integer and the last two, whichever is bigger. 

*Cost*: linear: `O(n)`