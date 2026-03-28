/*

class Chai {
  flavour: string;
  price: number;

  constructor(flavour: string, price: number) {
    this.flavour = flavour;
    this.price = price;
  }
}

const masalaChai = new Chai("Masala", 20);
*/

class Chai {
  public flavour: string = "Masala";
  private secreteIngrediants = "Cardaom";

  reveal() {
    return this.secreteIngrediants;
  }
}
const c = new Chai();

class Shop {
  protected shopName = "ChaiWala Shop";
}

class Branch extends Shop {
  getName() {
    return this.shopName;
  }
}

// new Branch().getName();

// Private

class Wallet {
  #balance = 100; // Private

  getBalance() {
    return this.#balance;
  }
}

// ReadyOnly

class Cup {
  readonly capacity: number = 120;
  constructor(capacity: number) {
    this.capacity = capacity;
  }
}

// Control gate, getter, setter'

class ModenChai {
  private _sugar = 2;

  get sugar() {
    return this._sugar;
  }

  set sugar(value: number) {
    if (value < 0) {
      throw new Error("Sugar cannot be negative");
    }
    this._sugar = value;
  }
}

const newChai = new ModenChai();

newChai.sugar = 3;

// Static

class EkChai {
  static shopName = "ChaiWala Shop";
}

console.log(EkChai.shopName);

// Abstract

abstract class Drink {
  abstract make(): void;
}

class MyChai extends Drink {
  make(): void {
    console.log("Making my chai");
  }
}

// Composition

class Heater {
  heat() {}
}

class ChaiMaker {
  constructor(private heater: Heater) {}

  make() {
    this.heater.heat();
  }
}
