let subs: number | string = "10m";
let apiRequestStatus: "pending" | "success" | "error" = "pending";
apiRequestStatus = "success";

let airlineSeat: "aisle" | "window" | "middle" = "aisle";
airlineSeat = "middle";

const orders = [12, 30, 20, 9];

// let currentOrder;
// Avoid any, by default it is any applied
let currentOrder: number | undefined;

for (let order of orders) {
  if (order == 20) {
    currentOrder = order;
    break;
  }
}

console.log(currentOrder);
