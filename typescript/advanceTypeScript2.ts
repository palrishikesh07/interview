// infer
type Generic<T> = T extends Array<infer A>? A extends string ? number: never : never;

type Result = Generic<string[]>; // Result is number    
type Result2 = Generic<number[]>; // Result2 is never
type Result3 = Generic<string>; // Result3 is never

const b = ["Hello", "World"];
const c = ["Hello", 42, true];
const d = "Not an array";
const e = [1, 2, 3];

const a: Generic<typeof b>; // a is 0 because b is an array of strings
const a2: Generic<typeof c>; // a2 is never because c is an array but not of strings
const a3: Generic<typeof d>; // a3 is never because d is not an array
const a4: Generic<typeof e>; // a4 is never because e is an array but not of strings


// Return types
type A = ReturnType <typeof fetch>; // A is Promise<Response>

type B = ReturnType <() => number>; // B is number

type C = ReturnType <() => void>; // C is void

type D = ReturnType <() => Promise<string>>; // D is Promise<string>


// Own return types
type CustomReturnType<T extends (...args:any[])=>any> = T extends (...args:any[])=>infer R ? R : never;

type E = CustomReturnType <typeof fetch>; // E is Promise<Response>

type F = CustomReturnType <() => number>; // F is number

type Tawaited = Awaited<Promise<string>>; // Tawaited is string

type Tawaited2 = Awaited<string>; // Tawaited2 is string

type Tawaited3 = Awaited<Promise<Promise<number>>>; // Tawaited3 is number

type Tawaited4 = Awaited<Promise<string | number>>; // Tawaited4 is string | number

// Response 

type CustomAwaited<T> = T extends Promise<infer P> ? P : T;
type TCustomAwaited = CustomAwaited<Promise<string>>; // TCustomAwaited is string
type TCustomAwaited2 = CustomAwaited<typeof fetch>; // TCustomAwaited2 is Response


// Request. key value pairs

type KeyValueSplitter<T extends string> = T extends `${infer K}:${infer V}` ? { key: K; value: V } : never;

type KV1 = KeyValueSplitter<"name:John">; // KV1 is { key: "name"; value: "John" }
type KV2 = KeyValueSplitter<"age:30">;


type O={
    name:string;
    age:number;
}

type New<T>={
    [P in keyof T]:T[P]extends number ? string : T[P];;
}

// const a: New<O> = {
//     name: "John",
//     age: 30,
// }

const a: New<O> = {
    name: "John",
    age: "30",
}

// Add and remove modifiers, readonly and optional
type OA={
    readonly name:string;
    age?:number;
}

type New2<T>={
    -readonly[P in keyof T]-?:T[P]
}

const a: New2<OA> = {
    name: "John",
    age: 30,
}

// Change property name as function of type

type OB={
    name:string;
    age:number;
}

type New3<T>={
    // [P in keyof T as `get${Capitalize<P & string>}`]:T[P]
    [P in keyof T as `get${Capitalize<P & string>}`]:() => T[P] // To make function
}

// const a: New3<OB> = {
//     getName: "John",
//     getAge: 30,
// }

const a: New3<OB> = {
    getName: () => "John",
    getAge: () => 30,
}



class Vehicle {
  start() {
    console.log("Engine started");
  }
}

class Car extends Vehicle {
  private make: string;
  
  constructor(make: string) {
    super(); // Initializes parent class
    this.make = make;
  }
  
  start() {
    console.log(`${this.make} engine started`);
  }
}   



