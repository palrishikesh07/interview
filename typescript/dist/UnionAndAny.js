let subs = "10m";
let apiRequestStatus = "pending";
apiRequestStatus = "success";
let airlineSeat = "aisle";
airlineSeat = "middle";
const orders = [12, 30, 20, 9];
// let currentOrder;
// Avoid any, by default it is any applied
let currentOrder;
for (let order of orders) {
    if (order == 20) {
        currentOrder = order;
        break;
    }
}
console.log(currentOrder);
export {};
//# sourceMappingURL=UnionAndAny.js.map