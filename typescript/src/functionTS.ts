function makeChai(type: string, cups: number) {
  console.log(`Making ${cups} cups of ${type} chai`);
}

makeChai("Masala", 2);

function getChaiPrice(): number {
  return 20;
}

function makeORder(order: string) {
  if (!order) return null;
  return order;
}

function logChai(): void {
  console.log("Chai is ready with out return types");
}

function orderChai(type?: string) {}

function orderChaiUpdate(type: string = "Masala") {}

function createChai(order: {
  type: string;
  sugar: number;
  size: "small";
}): number {
  return 4;
}
