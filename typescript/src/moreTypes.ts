let response: any = "34";

let numericLength: number = (response as string).length; // force full type assertion

type Book = {
  name: string;
};

let bookString = '{"name":"Who moved my cheese"}';
let bookObject = JSON.parse(bookString) as Book; // forfull type assertion

console.log(bookObject.name);

const inputElement = document.getElementById("userName") as HTMLInputElement;

let value: any;
value = "chai";
value = [12, 3, 4];
value = 20.3;
value.toUpperCase();

let newValue: unknown;
newValue = "chai";
newValue = [12, 3, 4];
newValue = 20.3;
if (typeof newValue === "string") {
  newValue.toUpperCase();
}

// With try catch also

try {
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  }
  console.log("Error ", err);
}

const data: unknown = "chai aur code";

const strData: string = data as string;

// Never

type Role = "Admin" | "User" | "Guest";

function redirectBasedOnRole(role: Role): void {
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

function neverReturn(): never {
  while (true) {}
}
