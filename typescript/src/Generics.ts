// Is a template, make code reusable

function wrapInArraySimple(item: number): number[] {
  return [item];
}

function wrapInArray<T>(item: T): T[] {
  return [item];
}

wrapInArray("Masala");
wrapInArray(20);
wrapInArray({ flavor: "Masala" });

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

pair("Masala", 20);
pair("Masala", "20");
pair("Masala", "Tea");

// Generic Interfaces

interface IBox<T> {
  content: T;
}

// Uses
const numberBox1: IBox<number> = { content: 5 };
const stringBox1: IBox<string> = { content: "Hello" };

interface ApiPromise<T> {
  status: number;
  data: T;
}

const res: ApiPromise<{ flavor: string }> = {
  status: 200,
  data: {
    flavor: "Masala",
  },
};
