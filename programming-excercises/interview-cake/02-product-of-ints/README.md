# Find the product of every integer in an array except the integer at that index

## The challenge
You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

Write a function `getProductsOfAllIntsExceptAtIndex()` that takes an array of integers and returns an array of the products.

For example, given:
`[1, 7, 3, 4]`

your function would return:
`[84, 12, 28, 21]`

by calculating:
`[7*3*4, 1*3*4, 1*7*4, 1*7*3]`

Do not use division in your solution.

## The solution
When iterating through the array create products of the elements already read (accumulators) and fill up the target array. 
Make sure the element in the current position does not contribute to the target array.
While iterating read input elements both from the beginning and the end to avoid having to iterate twice thereby decreasing the computational cost of the solution.
When filling up the output array check if at the current position there is already a value and if so do not 
overwrite it, instead multiply it with the accumulator. 

### Cost
O(n)