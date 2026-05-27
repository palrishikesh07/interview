type Generic<T extends string>={
    name:T;
}

type Custom= {
    age:number;
} & string;

const a:Generic<Custom>;

// 

type Generic2<T> = T extends string ? true : false;

const aG = Generic2<string>; // true
const bG = Generic2<number>; // false
// type Generic2<T> = T extends string ? { name: T } : never;

type Generic3<T>={
    prop: T extends string ? string : T extends number ? number : undefined;
}

const aG3: Generic3<string> = { prop: "Hello" }; // prop is string
const bG3: Generic3<number> = { prop: 42 }; // prop is number
const cG3: Generic3<boolean> = { prop: undefined }; // prop is undefined    