interface IChai {
  flavor: string;
  price: number;
  milk?: boolean;
}

const masala: IChai = {
  flavor: "Masala",
  price: 20,
};

interface IShop {
  readonly id: number;
  name: string;
}

const s: IShop = {
  id: 1,
  name: "ChaiWala Shop",
};
// s.id=22 // not allowed

interface IDiscountCalculator {
  (price: number): number;
}
// Interface uses for above defination

const apply50: IDiscountCalculator = (p) => p * 0.4;

interface ITeaMachine {
  start(price: number): void;
  stop(): void;
}

const machine: ITeaMachine = {
  start(price: number) {
    console.log("Started with ", price);
  },
  stop() {
    console.log("Stopped");
  },
};

// Index signature
interface IChaiRatings {
  [flavor: string]: number;
}

const ratings: IChaiRatings = {
  masala: 4.9,
  ginger: 3.8,
};

// Combine interfaces

interface IUser {
  name: string;
}
interface IUser {
  age: number;
}

const u: IUser = {
  name: "HRishi",
  age: 31,
};

// Same way as below also

interface A {
  a: string;
}
interface B {
  b: string;
}

interface C extends A, B {}
