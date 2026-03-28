// Is a template, make code reusable
function wrapInArraySimple(item) {
    return [item];
}
function wrapInArray(item) {
    return [item];
}
wrapInArray("Masala");
wrapInArray(20);
wrapInArray({ flavor: "Masala" });
function pair(a, b) {
    return [a, b];
}
pair("Masala", 20);
pair("Masala", "20");
pair("Masala", "Tea");
// Uses
const numberBox1 = { content: 5 };
const stringBox1 = { content: "Hello" };
const res = {
    status: 200,
    data: {
        flavor: "Masala",
    },
};
export {};
//# sourceMappingURL=Generics.js.map