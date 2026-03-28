//You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

const prices = [7, 1, 5, 3, 6, 4];
// const prices = [7, 6, 4, 3, 1]

function findMaxProfit(arr) {
    let maxProfit = 0;
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            const profit = arr[j] - arr[i];
            if (profit > 0) {
                maxProfit = Math.max(maxProfit, profit)
            }
        }
    }

    return maxProfit;
}


console.log(findMaxProfit(prices))


function findMaxProfitOptimize(prices) {
    // Minimum price seen so far
    let buyPrice = prices[0];
    // max profit
    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
        // if Current price is lower, update buy price
        if (prices[i] < buyPrice) {
            buyPrice = prices[i];
        }
        // if Current price is higher than buy price, update profit
        else {
            // Calculate profit is sold today
            let currentProfit = prices[i] - buyPrice;
            // Update max profit
            profit = Math.max(profit, currentProfit);
        }
    }


    return profit;
}

console.log(findMaxProfitOptimize(prices));