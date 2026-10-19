
function promiseAll(promises) {
    // Create promise response with return
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;

        promises.forEach((singlePromise,index) => {
            Promise.resolve(singlePromise)
            .then(result=>{
                results[index] = result;
                completed++;
                if(completed == promises.length){
                    resolve(results);
                }
            })
            .catch(reject);
        });
    })
}

const data =await promiseAll([Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)])
console.log(data);