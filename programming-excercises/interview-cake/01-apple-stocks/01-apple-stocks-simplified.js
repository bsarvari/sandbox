function Dealer(prices){
  this.getBestDeal = function (){
    if(prices.length < 2) throw "Deal impossible";
    var lowestPrice = prices[0];
    var bestProfit = prices[1] - prices[0];

    for(var t=1; t<prices.length; t++){
      if(prices[t] - lowestPrice > bestProfit){
        bestProfit = prices[t] - lowestPrice;
      }

      lowestPrice = Math.min(lowestPrice, prices[t]);
    }

    return bestProfit;
  }
}

exports = exports || {};
exports.Dealer = Dealer;