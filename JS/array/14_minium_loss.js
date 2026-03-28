// console.log(Math.max(-12, -5))

const arr = [20, 15, 8, 2, 12];

function findMinimumLoss(arr) {
    let loss = - Infinity;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const currentLoss = arr[j] - arr[i];
            if (currentLoss < 0) {
                console.log(currentLoss)
                loss = Math.max(loss, currentLoss);
            }
        }
    }
    console.log("Minium Loss: ", loss)
    return loss * -1;
}

console.log(findMinimumLoss(arr))



function findMinimumLossWithMap(price) {
    // Step 1: Map price -> original index
    const priceIndexMap = new Map();
    const priceLength = price.length;

    for (let i = 0; i < priceLength; i++) {
        priceIndexMap.set(price[i], i);
    }
    console.log(priceIndexMap)
    //  Step 2: Sort prices (ascending)
    console.log(price)
    price.sort((a, b) => a - b);
    console.log(price)

    let minimumLoss = Infinity;

    for (let i = priceLength - 1; i > 0; i--) {
        // console.log(price[i])
        // Reject invalid case (buy happens after sell ❌)

        if (priceIndexMap.get(price[i]) > priceIndexMap.get(price[i - 1])) {
            console.log("continure")
        }
        // Valid loss
        console.log("(priceIndexMap.get(price[i]))", priceIndexMap.get(price[i]), priceIndexMap.get(price[i - 1]), price[i])

        const dayLoss = price[i] - price[i - 1];
        console.log(dayLoss);
        minimumLoss = Math.min(minimumLoss, dayLoss);
    }
    return minimumLoss;


}

console.log(findMinimumLossWithMap(arr));

