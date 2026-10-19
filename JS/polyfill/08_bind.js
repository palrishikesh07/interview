function printName(city, country, street=undefined) {
    console.log(`${this.firstName} ${this.lastName}, ${street || ""} ${city} - ${country}`);
}

const myName = {
    firstName: "Rishi",
    lastName: "Pal"
}

// Bind
const result = printName.bind(myName,"Bangalore");
result("India");


// Prototype

Function.prototype.customBind=function(context,...args){

    const fn = this

    return function(...newArgs){
        return fn.apply(context, [...args,...newArgs]);
    }
}


const result2 = printName.bind(myName,"Bangalore");
result2("India");