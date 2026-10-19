// Polyfill in JavaScript is a piece of code that provides modern functionality on older browsers that do not natively support it.

// How It Works: A polyfill typically checks if a feature exists(if (!Feature.prototype.method)), and if not, it defines the missing functionality using existing JavaScript capabilities.



var arr =[2,3,4,5,10,13];


// console.log(arr.map(multiplyByFive));

Array.prototype.customMap = function(callback){
    const result= [];
    const n = arr.length;

    for(let i=0; i< n; i++){
        result.push(callback(this[i],i,this));
    }
    return result;
}

console.log(arr.customMap(multiplyByFive));



function multiplyByFive(value,index,array){
    // console.log(value,"\t"+index, array);
    return value*5;
}