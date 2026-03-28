const chaiFlavours = ["Masala", "Ginger", "Green"];
const chaiPrice = [20, 25, 30];
const rating = [4.5, 4.0, 4.8];
const menu = [
    { name: "Masala", price: 20 },
    { name: "Ginger", price: 25 },
    { name: "Green", price: 30 },
];
// Readonly Array
const cities = ["Mumbai", "Bangalore"];
// Unable to push
//cities.push("df");
const table = [
    [1, 2],
    [3, 4],
];
// Tuples
let chaiTuple;
chaiTuple = ["Masala", 20];
// chaiTuple=[10,"ginger"]// Not allowed as order has to maintain
let userInfo;
userInfo = ["John", 30];
// Readonly tuples
const location = [28.66, 77.2];
// Named tuples
const chaiItems = ["Masala", 20];
// ENUM
var CupSize;
(function (CupSize) {
    CupSize[CupSize["SMALL"] = 0] = "SMALL";
    CupSize[CupSize["MEDIUM"] = 1] = "MEDIUM";
    CupSize[CupSize["LARGE"] = 2] = "LARGE";
})(CupSize || (CupSize = {}));
const size = CupSize.MEDIUM;
// Increment number;
var Status;
(function (Status) {
    Status[Status["PENDING"] = 100] = "PENDING";
    Status[Status["SERVER"] = 101] = "SERVER";
    Status[Status["CANCELLED"] = 102] = "CANCELLED";
})(Status || (Status = {}));
var ChaiType;
(function (ChaiType) {
    ChaiType["MASALA"] = "Masala";
    ChaiType["GINGER"] = "Ginger";
})(ChaiType || (ChaiType = {}));
function makeChai(type) {
    console.log(type);
}
makeChai(ChaiType.MASALA);
// Not recomend but we can use
var RandomEnum;
(function (RandomEnum) {
    RandomEnum[RandomEnum["ID"] = 1] = "ID";
    RandomEnum["NAME"] = "Hrishi";
})(RandomEnum || (RandomEnum = {}));
var Sugar;
(function (Sugar) {
    Sugar[Sugar["LOW"] = 1] = "LOW";
    Sugar[Sugar["MEDIUM"] = 2] = "MEDIUM";
    Sugar[Sugar["HIGH"] = 3] = "HIGH";
})(Sugar || (Sugar = {}));
const s = Sugar.LOW;
let t = ["chai", 20];
t.push("ginger"); // This should be avoided
export {};
//# sourceMappingURL=ArrayEnum.js.map