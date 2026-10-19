var arr =[2,3,4,5,10,13];
// array.filter(callback(currentValue,index,array));

console.log(arr.filter((x)=>x>4));

Array.prototype.customFilter=function(callback){
    console.log(callback)

    const result = [];
    
    for(let i=0; i<this.length; i++){

        if(callback(this[i],i,this)){  // This to check the condition
            result.push(this[i]);
        }
        
    }
    return result;
}

console.log(arr.customFilter((x)=>x>4));