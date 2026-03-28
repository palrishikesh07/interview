//  Inferenced Types
let user = { name: "John", age: 30 }; // Type is inferred as { name: string; age: number }

let tea: {
  name: string;
  price: number;
  isHot: boolean;
};

tea = {
  name: "Ginger Tea",
  price: 2.5,
  isHot: true,
};

// Alias
type Tea = {
  name: string;
  price: number;
  ingredients: string[];
};

const adarakChai: Tea = {
  name: "Adarak Chai",
  price: 3.0,
  ingredients: ["ginger", "cardamom", "cinnamon"],
};

// Duck type, bare minum type maching

type Cup = { size: string };
let smallCup: Cup = {
  size: "100ml",
};

let bigCup: Cup = { size: "500", material: "steel" };

smallCup = bigCup; // This will not throw error

type Brew = { brewTime: number };

const coffee = { brewTime: 5, beans: "Arabica" };

const chaiBrew: Brew = coffee;

type Item = { name: string; quantity: number };
type Address = { street: string; pin: number };

type Order = {
  id: string;
  items: Item[];
  address: Address;
};

type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};

// const updatedChaiFn = (update: Chai)=>{
// }

const updatedChaiFn = (update: Partial<Chai>) => {
  console.log(update);
};

updatedChaiFn({ price: 2.5 }); // This willl work as Partial can take any value
// Some time empy object is allowed, so very careful

//To make required in params, althoug it is optional in types
type ChaiOrder = {
  name?: string;
  quantity?: number;
};

const placeOrder = (order: Required<ChaiOrder>) => {
  console.log(order);
};

placeOrder({ name: "Chai", quantity: 2 }); // Need to pass both value

// Pick, only pick particular object properties

type ChaiType = {
  name: string;
  price: number;
  isHot: boolean;
  ingredients: string[];
};

type BasicChaiInfor = Pick<ChaiType, "name" | "price">;
// Only name and price is picking up from Chai Type
const chaiInfo: BasicChaiInfor = {
  name: "Lemongrass Chai",
  price: 2.5,
};

// Omit

type ChaiNew = {
  name: string;
  price: number;
  isHot: boolean;
  secretIngredients: string[];
};

type publicChai = Omit<ChaiNew, "secretIngredients">;
