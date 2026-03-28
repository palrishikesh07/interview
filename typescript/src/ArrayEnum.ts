const chaiFlavours: string[] = ["Masala", "Ginger", "Green"];
const chaiPrice: number[] = [20, 25, 30];

const rating: Array<number> = [4.5, 4.0, 4.8];

type Chai = {
  name: string;
  price: number;
};

const menu: Chai[] = [
  { name: "Masala", price: 20 },
  { name: "Ginger", price: 25 },
  { name: "Green", price: 30 },
];

// Readonly Array

const cities: readonly string[] = ["Mumbai", "Bangalore"];
// Unable to push
//cities.push("df");

const table: number[][] = [
  [1, 2],
  [3, 4],
];

// Tuples
let chaiTuple: [string, number];
chaiTuple = ["Masala", 20];
// chaiTuple=[10,"ginger"]// Not allowed as order has to maintain

let userInfo: [string, number, boolean?];
userInfo = ["John", 30];

// Readonly tuples
const location: readonly [number, number] = [28.66, 77.2];

// Named tuples

const chaiItems: [name: string, price: number] = ["Masala", 20];

// ENUM

enum CupSize {
  SMALL,
  MEDIUM,
  LARGE,
}

const size = CupSize.MEDIUM;

// Increment number;
enum Status {
  PENDING = 100,
  SERVER, // 101
  CANCELLED, // 102
}

enum ChaiType {
  MASALA = "Masala",
  GINGER = "Ginger",
}

function makeChai(type: ChaiType) {
  console.log(type);
}

makeChai(ChaiType.MASALA);

// Not recomend but we can use
enum RandomEnum {
  ID = 1,
  NAME = "Hrishi",
}

const enum Sugar {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

const s = Sugar.LOW;

let t: [string, number] = ["chai", 20];
t.push("ginger"); // This should be avoided
