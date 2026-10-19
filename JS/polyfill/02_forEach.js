var arr =[2,3,4,5,10,13];

// forEach
// array.forEach(callback(currentValue,index,array));


arr.forEach((currentValue)=>{
    console.log("Val",currentValue);
});

// Polyfill
Array.prototype.customForEach=function(callback){
    
    for(let i=0;i<this.length; i++){
        callback(this[i],i,this);
    }
};


arr.customForEach((currentValue)=>{
    console.log(currentValue);
})
