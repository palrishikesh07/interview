
function printName(city, country) {
    console.log(`${this.firstName} ${this.lastName}, ${city} - ${country}`);
}

const myName = {
    firstName: "Rishi",
    lastName: "Pal"
}
// Call
printName.call(myName, "Mumbai", "India");


// Polyfill

// console.log("this in customCall: ", this); // [Function: printName]
// console.log("this in context: ", context); //  { firstName: 'Rishi', lastName: 'Pal' }' 
// console.log("this in globalThis: ", globalThis); //  <ref *1> Object [global] {...



Function.prototype.customCall = function (context, ...args) {


    context = context || globalThis; 

    const key = Symbol();                   // unique key to avoid conflict

    context[key] = this;                     // assign the function to the context, so that it can be called as a method, 'this' is the function to be called

    const result = context[key](...args);    // Execute the function and capture the result
    delete context[key];                    // Delete the temporary property

    return result;

}

printName.customCall(myName, "Mumbai", "India");

























if (!Function.prototype.customCall) {
    Function.prototype.customCall = function (context, ...args) {
        // console.log("this in customCall: ", this); // [Function: show]
        // console.log("this in context: ", context); // { msg: 'Called using call' 
        // console.log("this in globalThis: ", globalThis); //  <ref *1> Object [global] {...
        context = context || globalThis;

        const key = Symbol(); // unique key to avoid conflict
        context[key] = this; // assign the function to the context, so that it can be called as a method, 'this' is the function to be called

        // console.log("context after adding function: ", context); // { msg: 'Called using call', [Symbol()]: [Function: show] }
        // Execute the function and capture the result
        const result = context[key](...args);
        console.log("result in customCall: ", result); // undefined, because in show function does not return anything
       
        delete context[key];  // Delete the temporary property

        // Return the result of the function call
        return result;
    };
}
