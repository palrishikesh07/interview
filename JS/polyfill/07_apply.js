
function printName(city, country) {
    console.log(`${this.firstName} ${this.lastName}, ${city} - ${country}`);
}

const myName = {
    firstName: "Rishi",
    lastName: "Pal"
}
// apply
printName.apply(myName, ["Mumbai", "India"]);

// Sample like call prototype just change ...arg parameter

Function.prototype.customApply=function(context,args){
    context = context || globalThis
    const key = Symbol();

    context[key] = this;

    const result = context[key](...(args || [])); // Incase if empty value is there
    delete context[key];
    return result;
}

printName.customApply(myName, ["Mumbai", "India"]);
