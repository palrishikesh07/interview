💀 1. What is the type of a?
type A = string | number;
type B = string | boolean;

type C = A & B;

let a: C;

✅ Answer:
string

🧠 Why?

Intersection means common part.

(string | number)
&
(string | boolean)

Common type = string

💀 2. What is the type of result?
type Test<T> = T extends string ? "YES" : "NO";

type result = Test<string | number>;

✅ Answer:
"YES" | "NO"

🧠 Why?

Conditional types distribute over unions.

It becomes:

Test<string> | Test<number>

So:

"YES" | "NO"

This is called Distributive Conditional Types

💀 3. What is the type of x?
type Foo = {
a: string;
b: number;
};

type Bar = keyof Foo;

let x: Bar;

✅ Answer:
"a" | "b"

💀 4. What is the type of value?
type User = {
name: string;
age: number;
};

function getValue<T, K extends keyof T>(obj: T, key: K) {
return obj[key];
}

const user = { name: "Rishi", age: 25 };

const value = getValue(user, "name");

✅ Answer:
string

Because:

T = { name: string; age: number }
K = "name"
T[K] = string

💀 5. What is the output?
type X = never | string;

✅ Answer:
string

🧠 Why?

never disappears in unions.

never | string = string

💀 6. What is the output?
type X = never & string;

✅ Answer:
never

🧠 Why?

Intersection with never is always never.

💀 7. What is printed?
let value: any = "Hello";
value = 10;
value.toUpperCase();

✅ Answer:

No compile-time error.

🧠 Why?

any disables type checking completely.

Dangerous in large apps.

💀 8. What about this?
let value: unknown = "Hello";
value.toUpperCase();

✅ Answer:

❌ Error

🧠 Why?

unknown requires type narrowing first.

Correct version:

if (typeof value === "string") {
value.toUpperCase();
}

💀 9. What is the type of T?
type T = Exclude<string | number | boolean, number>;

✅ Answer:
string | boolean

Exclude<T, U> removes U from T.

💀 10. What is the type?
type T = Extract<string | number | boolean, number>;

✅ Answer:
number

Extract keeps only matching type.

💀 11. What is the type of a?
type X = {
name: string;
};

type Y = {
name: number;
};

type Z = X & Y;

let a: Z;

✅ Answer:
never

🧠 Why?
string & number = never

So:

name: never

Object becomes impossible.

💀 12. What happens here?
function fn<T>(arg: T) {
return arg;
}

const result = fn("Hello");

✅ Type of result:
string

Type inference automatically infers T = string

💀 13. What is the type?
type T<T> = T extends any ? T[] : never;

type Result = T<string | number>;

✅ Answer:
string[] | number[]

🧠 Why?

Distributive over union again.

Becomes:

T<string> | T<number>

💀 14. What is the type?
type A = { a: string };
type B = { b: number };

type C = A | B;

const obj: C = { a: "hello", b: 10 };

✅ Answer:

✅ Valid

Union allows object satisfying both.

💀 15. What is the type?
type T = { a?: string };

const obj: T = {};

✅ Answer:

Valid

Optional property means it can be omitted.

💀 16. Advanced One (Senior Killer)
type Flatten<T> = T extends Array<infer U> ? U : T;

type Result = Flatten<string[]>;

✅ Answer:
string

🧠 Explanation:

infer U extracts inner type from array.

💀 17. Super Tricky
type A = { a: string };
type B = { a?: string };

type C = A & B;

✅ Type of C:
{ a: string }

Required wins over optional.

💀 18. What is the type?
type T = string & number;

✅ Answer:
never

Impossible type.
