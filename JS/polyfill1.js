// Need to create custom entries

const obj1={
    "name":"raj",
    "age":"30"
}
//[["name","raj"],["age":"30"]]

// const objArray = Object.entries(obj1);
// console.log(objArray)

Object.prototype.customEntries=function(){
    console.log(this)
    // const inputObject = this;
    for(let key in this){
        console.log("key",this[key])
    }
    return "hi how are you";
}

const customEntries = obj1.customEntries()


console.log("customEntries: ",customEntries)