/**
 * An iterator is an object with a next() method that returns { value, done }. done is true when iteration
    is complete.
   Any object implementing the iterator protocol can be iterated with for...of, spread,
    destructuring.
 * 
 */

    // [Symbol.iterator](){
    //     let curr = start;
    //     return {
    //         next(){
    //             return curr<=end ? {value:curr++, done:false}:{ value:undefined, done:true}
    //         }
    //     }
    // }

function range(start, end) {
    return {
        [Symbol.iterator]() {
            let cur = start;
            return {
                next() {
                    return cur <= end ? { value: cur++, done: false } : {value: undefined, done: true  };
                }
            };
        }
    };
} 

console.log([...range(1, 5)]); // [1,2,3,4,5]