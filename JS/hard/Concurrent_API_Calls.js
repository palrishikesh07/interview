const userIds = [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16];
console.log(userIds);


async function processInBatches(items, batchSize) {
    const result=[];
    console.log(batchSize);
    let n=items.length;

    for(let i=0; i<n; i +=batchSize){
        const batch = items.slice(i, i+batchSize);

        const batchResults = await Promise.all(batch.map(item=>fetchUser(item)));

        result.push(...batchResults);
    }
    console.log(result)
}

processInBatches(userIds,10);


function fetchUser(userId){
    return `User: ${userId}`;
}
