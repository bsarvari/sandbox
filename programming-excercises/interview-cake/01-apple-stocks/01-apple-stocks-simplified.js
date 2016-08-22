/*
 * This is one possible solution but it's not optimal because there is no requirement
 * to suggest the actual buy and sell times as the logic below does encapsulated in a Deal object. 
 * The specification only requires us to return the best possible profit we could make. 
 * It does not care about the buy and sell times.
 * 
 * Deriving the best profit instead of the best Deal simplifies and speeds up the solution.
 */

function Dealer(prices){
  this.getBestDeal = function (){
    var deals = []; // potential deals
    var lowestPriceIndex = 0;
    deals.push(new Deal(0, 1, prices)); // the best deal in the beginning
    for(var t=1; t<prices.length; t++){
      deals.forEach(function (d){
        if(d.getSellPrice() < prices[t]){
          d.sellTime = t;
        }
      });
      if(prices[t]< prices[lowestPriceIndex]){
        lowestPriceIndex = t;
        if(t < prices.length-1){
          deals.push(new Deal(t, t+1, prices));
        }
      }
    }

    deals.sort(function(d1, d2){
      if(d1.getProfit() == d2.getProfit()) return 0;
      if(d1.getProfit() > d2.getProfit()) return -1;
      if(d1.getProfit() < d2.getProfit()) return 1;
    });
    return deals[0];
  }
}


function Deal(buyTime, sellTime, prices){
  this.buyTime = buyTime;
  this.sellTime = sellTime;
  this.prices = prices;
}

Deal.prototype = {
  getBuyPrice: function(){
    return this.prices[this.buyTime];
  },

  getSellPrice: function(){
    return this.prices[this.sellTime];
  },

  getProfit: function(){
    return this.getSellPrice() - this.getBuyPrice();
  }
};

exports = exports || {};
exports.Dealer = Dealer;