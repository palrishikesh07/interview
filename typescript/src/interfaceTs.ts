type ChaiORder = {
  type: string;
  sugar: number;
  strong: boolean;
};

function makeChai(order: ChaiORder) {}

function serverChai(order: ChaiORder) {}

type TeaRecipe = {
  water: number;
  milk: number;
};

class MasalChai implements TeaRecipe {
  water = 100;
  milk = 50;
}

// It will not allowed as customise type
// It also know as literal types as value given as literal value
type CupSize = "small" | "large";
// class Chai implements CupSize {}

// Make it to interface

interface ICupSize {
  size: "small" | "large";
}

class Chai implements ICupSize {
  size: "small" | "large" = "small";
}

type Response = { ok: true } | { ok: false }; // This also not work in class implementation

// Union
type TeaType = "masala" | "green" | "black";

function orderChai(t: TeaType) {
  console.log(t);
}

// Intersection
type SimpleChai = { tealeave: number };
type Extra = { masala: number };

type MatMasalaChai = SimpleChai & Extra;

const cup: MatMasalaChai = {
  tealeave: 2,
  masala: 2,
};

// Optional

type User = {
  userName: string;
  bio?: string;
};

const u1: User = { userName: "Rishi" };
const u2: User = { userName: "Raj", bio: "I like chai" };

// Readonly, value once set can not changes

type Config = {
  readonly appName: string;
  version: number;
};

const cfg: Config = {
  appName: "My App",
  version: 1,
};

cfg.appName = "chan not change";
