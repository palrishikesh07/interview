// Promise.all

const promise1 = Promise.resolve(3);
const promise2= 42;
const promise3 = new Promise((resolve,reject)=>{
    setTimeout(resolve,100,"foo")// or below

    //  setTimeout(() => {
    //     resolve("foo");
    // }, 100);
})

// Promise.all([promise1,promise2,promise3]).then((value)=>{
//     console.log(value);
// })


Promise.customAll = function(values){
    return new Promise((resolve, reject)=>{
        

         if (values.length === 0) {
            resolve([]);
            return;
        }


        const output = [];
        let completed = 0;

        values.forEach((element,index) => {
           
            Promise.resolve(element)
            .then(result => {
                output[index] = result;
                completed++;
                if(completed == values.length){
                    resolve(output);
                }
            }).catch(reject)
        });
    })
}


Promise.customAll([promise1]).then((value)=>{
    console.log(value);
})



// This is only work with synchron code
/*
Promise.customAll = function(values){
    return new Promise((resolve, reject)=>{
        const output = [];

        values.forEach(element => {
            element.then(result=>{
                output.push(result);
            })
        });
    })
}
*/