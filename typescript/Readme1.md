# 📘 Complete Practical TypeScript Interview Handbook (All-in-One)

Author: Rishikesh Pal  
Role: MERN Stack Developer

---

## 1️⃣ What is TypeScript?

TypeScript is a **superset of JavaScript** that adds:

- Static typing
- Compile-time error checking
- Interfaces & Generics
- Better tooling support

It compiles into plain JavaScript.

---

## 2️⃣ Basic Types in TypeScript

```ts
let name: string = "Rishikesh";
let age: number = 25;
let isActive: boolean = true;
let data: any = "Anything";
let ids: number[] = [1, 2, 3];
let tuple: [string, number] = ["Rishi", 25];
```

## 3️⃣ `var` vs `let` vs `const`

|           | var             | let              | const            |
| --------- | --------------- | ---------------- | ---------------- |
| Scope     | Function scoped | Block scoped     | Block scoped     |
| Redeclare | Can redeclare   | Cannot redeclare | Cannot redeclare |
| Reassign  | Can reassign    | Can reassign     | Cannot reassign  |

## 4️⃣ Interface in TypeScript

```ts
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

const user: User = {
  id: 1,
  name: "Rishikesh",
};
```

## 5️⃣ Type vs Interface

**Interface**

- Used for object structure
- Supports declaration merging
- Extendable

**Type**

- Supports union & intersection
- Can represent primitives

```ts
type ID = string | number;
```

## 6️⃣ Generics

Reusable type-safe components.

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>("Hello");
```

## 7️⃣ Union & Intersection

**Union**

```ts
let value: string | number;
```

**Intersection**

```ts
type A = { name: string };
type B = { age: number };
type Person = A & B;
```

## 8️⃣ Enum

```ts
enum Role {
  Admin,
  User,
  Guest,
}

let userRole: Role = Role.Admin;
```

## 9️⃣ Type Assertion

```ts
let value: any = "Hello";
let length = (value as string).length;
```

## 🔟 `any` vs `unknown`

| any                    | unknown                    |
| ---------------------- | -------------------------- |
| Disables type checking | Type-safe alternative      |
| Risky                  | Must check type before use |

```ts
let value: unknown;

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

## 1️⃣1️⃣ Optional Chaining

```ts
user?.profile?.name;
```

## 1️⃣2️⃣ Readonly

```ts
interface User {
  readonly id: number;
}
```

## 1️⃣3️⃣ `keyof` Operator

```ts
interface User {
  id: number;
  name: string;
}

type Keys = keyof User; // "id" | "name"
```

## 1️⃣4️⃣ Utility Types

- TypeScript utility types are built-in generic types that transform existing types into new ones without rewriting them, reducing code duplication and improving maintainability.

- **Partial**

```ts
const updateUser: Partial<User> = {
  name: "Updated",
};
```

- **Pick**

```ts
type UserName = Pick<User, "name">;
```

- **Omit**

```ts
type UserWithoutId = Omit<User, "id">;
```

## 1️⃣5️⃣ Abstract Class

```ts
abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound() {
    console.log("Bark");
  }
}
```

## 1️⃣6️⃣ Decorators (Advanced)

```ts
function Logger(target: Function) {
  console.log("Logging...");
}

@Logger
class Person {}
```

## 1️⃣7️⃣ Modules

```ts
// user.ts
export interface User {
  id: number;
}

// app.ts
import { User } from "./user";
```

## 1️⃣8️⃣ Strict Mode

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Enables:

- strictNullChecks
- strictBindCallApply
- strictFunctionTypes

## 1️⃣9️⃣ Deep Copy vs Shallow Copy

**Shallow Copy**

```ts
const copy = { ...obj };
```

**Deep Copy**

```ts
const deepCopy = JSON.parse(JSON.stringify(obj));
```

## 2️⃣0️⃣ Higher Order Function

```ts
function greet(fn: Function) {
  fn();
}
```

## 2️⃣1️⃣ Promise with TypeScript

```ts
function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    resolve("Data loaded");
  });
}
```

## 2️⃣2️⃣ Async / Await

```ts
async function loadData() {
  const data = await fetchData();
  console.log(data);
}
```

## 2️⃣3️⃣ Generic API Response Pattern

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const response: ApiResponse<string> = {
  success: true,
  data: "User Created",
};
```

## 2️⃣4️⃣ Repository Pattern Example

- The Repository Pattern in TypeScript is a design pattern that abstracts data access logic, centralizing interactions with data sources like databases or APIs.
- It promotes clean separation of concerns, making code more maintainable, testable, and scalable.

```ts
interface IRepository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
}

class UserRepo implements IRepository<User> {
  private users: User[] = [];

  getAll() {
    return this.users;
  }

  getById(id: number) {
    return this.users.find((u) => u.id === id);
  }
}
```

## 2️⃣5️⃣ Function Overloading

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any) {
  return a + b;
}
```

## 2️⃣6️⃣ Currying

```ts
function multiply(a: number) {
  return (b: number) => a * b;
}

const double = multiply(2);
```

## 2️⃣7️⃣ Memoization

```ts
const cache: Record<number, number> = {};

function square(n: number): number {
  if (cache[n]) return cache[n];
  cache[n] = n * n;
  return cache[n];
}
```

## 2️⃣8️⃣ Closure Example

```ts
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
```

## 2️⃣9️⃣ Execution Context

Memory Creation Phase

Execution Phase

TypeScript compiles to JavaScript and follows same execution model.
