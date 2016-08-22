# Find best profit
## The challenge
Suppose we could access yesterday's stock prices as an array, where:

The indices are the time in minutes past trade opening time, which was 9:30am local time.
The values are the price in dollars of Apple stock at that time.
So if the stock cost $500 at 10:30am, `stockPricesYesterday[60]` = 500.

Write an efficient function that takes `stockPricesYesterday` and returns the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.

For example:
```javascript
var stockPricesYesterday = [10, 7, 5, 8, 11, 9];

getMaxProfit(stockPricesYesterday);
// returns 6 (buying for $5 and selling for $11)
```
No "shorting"—you must buy before you sell. You may not buy and sell in the same time step (at least 1 minute must pass).

## The solution
* Keep track of the lowest price as walking through the array and adjust it as needed.
* Calculate current profit by subtracting current price and lowest price and update best possible profit if current profit is higher
* initially lowest price is `stockPricesYesterday[0]` and best profit is `stockPricesYesterday[1] - stockPricesYesterday[0]`  

### Cost
O(n)