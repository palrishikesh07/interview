# 🚀 TypeScript Interview Guide (5+ Years Experience)

This document contains **important TypeScript interview questions with answers and code snippets** designed for candidates with **5 years of experience**.

Focus Areas:

- Strong fundamentals
- Advanced types
- Generics
- Utility types
- Type safety design
- Real-world usage

---

# 1️⃣ What is TypeScript and Why Use It?

### ✅ Answer

TypeScript is a **strongly typed superset of JavaScript** that adds static typing, interfaces, generics, and advanced type features.

### ✅ Why companies use it:

- Compile-time error checking
- Better IntelliSense
- Safer refactoring
- Scalable codebase
- Improved developer experience

---

# 2️⃣ Interface vs Type

### ✅ Key Differences

| Interface                    | Type                        |
| ---------------------------- | --------------------------- |
| Supports declaration merging | No merging                  |
| Best for object shapes       | Best for unions, primitives |
| Extends with `extends`       | Uses `&`                    |

### ✅ Example

```ts
interface User {
  name: string;
  age: number;
}

type Admin = {
  name: string;
  role: string;
};

type Status = "success" | "error";

// declaration merging: adds an optional field to the existing `User` interface
interface User {
  email?: string;
}
const u: User = { name: "Alice", age: 30, email: "alice@example.com" };

// union of object shapes (type aliases are ideal for unions/primitives)
type RoleEntity = Admin | User;
const r1: RoleEntity = { name: "Bob", role: "owner" };

// interface extends (preferred for object shapes & OOP patterns)
interface Employee extends User {
  id: string;
  department?: string;
}
const e: Employee = { name: "Eve", age: 28, id: "E123" };

// intersection (&) to compose types (good for mixins / augmenting)
type Audited<T> = T & { createdAt: Date; createdBy: string };
const auditedAdmin: Audited<Admin> = {
  name: "Sam",
  role: "ops",
  createdAt: new Date(),
  createdBy: "system",
};

// discriminated union + exhaustive checking (real-world pattern)
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "rect":
      return s.width * s.height;
    default:
      return assertNever(s); // ensures compile-time exhaustiveness
  }
}
function assertNever(x: never): never {
  throw new Error("Unhandled case: " + JSON.stringify(x));
}

// conditional & infer types (advanced type-level programming)
type Id<T> = T extends { id: infer U } ? U : never;
type EmployeeId = Id<Employee & { id: string }>; // string

// utility types examples
type PartialUser = Partial<User>;
type ReadonlyAdmin = Readonly<Admin>;

const partial: PartialUser = { name: "Opt" };
const readonlyAdmin: ReadonlyAdmin = { name: "Root", role: "admin" };
// readonlyAdmin.role = "ops"; // error: Cannot assign to 'role' because it is a read-only property.
```

3️⃣ What Are Generics?
✅ Answer

Generics allow reusable components while preserving type safety.

❌ Without Generics
function identity(arg: any): any {
return arg;
}

✅ With Generics
function identity<T>(arg: T): T {
return arg;
}

identity<string>("Hello");
identity<number>(10);

4️⃣ What is keyof and typeof?
✅ keyof

Creates union of object keys.

interface User {
id: number;
name: string;
}

type UserKeys = keyof User;
// "id" | "name"

✅ typeof

Gets type from variable.

const user = {
id: 1,
name: "Rishi"
};

type UserType = typeof user;

5️⃣ Utility Types (Very Important for 5+ Years)
✅ Partial
interface User {
name: string;
age: number;
}

type PartialUser = Partial<User>;

✅ Pick
type NameOnly = Pick<User, "name">;

✅ Omit
type WithoutAge = Omit<User, "age">;

✅ Record
type UserRoles = Record<string, string>;

const roles: UserRoles = {
admin: "full",
user: "limited"
};

✅ Intersection (&)
type User = { name: string };
type Admin = { role: string };

type SuperUser = User & Admin;

const u: SuperUser = {
name: "Rishi",
role: "admin"
};

7️⃣ Type Narrowing
function printId(id: string | number) {
if (typeof id === "string") {
console.log(id.toUpperCase());
} else {
console.log(id.toFixed(2));
}
}

TypeScript narrows the type inside conditional blocks.

8️⃣ any vs unknown
any unknown
No type safety Type-safe
Avoid in production Preferred
let value: unknown = "Hello";

if (typeof value === "string") {
console.log(value.toUpperCase());
}

9️⃣ Enums
enum Role {
Admin,
User,
Guest
}

let userRole: Role = Role.Admin;

⚠️ Senior Tip:

Prefer union types:

type Role = "admin" | "user" | "guest";

🔟 Abstract Class
abstract class Animal {
abstract makeSound(): void;

move() {
console.log("Moving...");
}
}

class Dog extends Animal {
makeSound() {
console.log("Bark");
}
}

1️⃣1️⃣ Type Assertion
let value: unknown = "hello";

let strLength = (value as string).length;

1️⃣2️⃣ Declaration Merging
interface User {
name: string;
}

interface User {
age: number;
}

const user: User = {
name: "Rishi",
age: 25
};

1️⃣3️⃣ Mapped Types
type ReadOnlyUser<T> = {
readonly [K in keyof T]: T[K];
};

1️⃣4️⃣ Conditional Types
type IsString<T> = T extends string ? "Yes" : "No";

type Test1 = IsString<string>; // "Yes"
type Test2 = IsString<number>; // "No"

1️⃣5️⃣ Advanced Generic Function (Very Important)
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
return obj[key];
}

const user = { name: "Rishi", age: 25 };

const name = getValue(user, "name"); // string

1️⃣5️⃣ Advanced Generic Function (Very Important)
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
return obj[key];
}

const user = { name: "Rishi", age: 25 };

const name = getValue(user, "name"); // string

1️⃣6️⃣ Deep Partial (Senior-Level)
type DeepPartial<T> = {
[P in keyof T]?: T[P] extends object
? DeepPartial<T[P]>
: T[P];
};
