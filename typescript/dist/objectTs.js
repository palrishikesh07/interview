//  Inferenced Types
let user = { name: "John", age: 30 }; // Type is inferred as { name: string; age: number }
let tea;
tea = {
    name: "Ginger Tea",
    price: 2.5,
    isHot: true,
};
const adarakChai = {
    name: "Adarak Chai",
    price: 3.0,
    ingredients: ["ginger", "cardamom", "cinnamon"],
};
let smallCup = {
    size: "100ml",
};
let bigCup = { size: "500", material: "steel" };
smallCup = bigCup; // This will not throw error
const coffee = { brewTime: 5, beans: "Arabica" };
const chaiBrew = coffee;
// const updatedChaiFn = (update: Chai)=>{
// }
const updatedChaiFn = (update) => {
    console.log(update);
};
updatedChaiFn({ price: 2.5 }); // This willl work as Partial can take any value
const placeOrder = (order) => {
    console.log(order);
};
placeOrder({ name: "Chai", quantity: 2 }); // Need to pass both value
// Only name and price is picking up from Chai Type
const chaiInfo = {
    name: "Lemongrass Chai",
    price: 2.5,
};
export {};
//# sourceMappingURL=objectTs.js.map