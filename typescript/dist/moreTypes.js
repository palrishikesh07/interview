let response = "34";
let numericLength = response.length; // force full type assertion
let bookString = '{"name":"Who moved my cheese"}';
let bookObject = JSON.parse(bookString); // forfull type assertion
console.log(bookObject.name);
const inputElement = document.getElementById("userName");
let value;
value = "chai";
value = [12, 3, 4];
value = 20.3;
value.toUpperCase();
let newValue;
newValue = "chai";
newValue = [12, 3, 4];
newValue = 20.3;
if (typeof newValue === "string") {
    newValue.toUpperCase();
}
// With try catch also
try {
}
catch (err) {
    if (err instanceof Error) {
        console.error(err.message);
    }
    console.log("Error ", err);
}
const data = "chai aur code";
const strData = data;
function redirectBasedOnRole(role) {
    if (role === "Admin") {
        // return Redirect to admin page
        return;
    }
    if (role === "User") {
        // return Redirect to user page
        return;
    }
    role; // It will give us remaining roles available(in case if we have missed something)
}
function neverReturn() {
    while (true) { }
}
export {};
//# sourceMappingURL=moreTypes.js.map