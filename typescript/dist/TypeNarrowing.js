function getChai(kind) {
    if (typeof kind === "string") {
        // kind is narrowed to string
        return `Making chai with kind: ${kind}`;
    }
    else {
        // kind is narrowed to number
        return `Chai order: ${kind}`;
    }
}
function serveChai(msg) {
    if (msg) {
        return `Serving chai: ${msg}`;
    }
    return `Serving default chai`;
}
function orderChai(size) {
    if (size === "small") {
        return `Ordering small chai`;
    }
    else if (size === "medium" || size === "large") {
        return `Making extra chai`;
    }
    else {
        return `Chai order: ${size}`;
    }
}
class KulhadChai {
    serve() {
        return `Serving kulhad chai`;
    }
}
class Cutting {
    serve() {
        return `Serving cutting chai`;
    }
}
function serve(chai) {
    if (chai instanceof KulhadChai) {
        return chai.serve();
    }
    return chai.serve();
}
function isChaiOder(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number");
}
function serverOrder(item) {
    if (isChaiOder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`;
    }
    return `Serving default chai`;
}
function makeChai(order) {
    switch (order.type) {
        case "Masala":
            return `Making masala chai with spice level: ${order.spiceLevel}`;
        case "Elaci":
            return `Making elaci chai with no: ${order.no}`;
        default:
            break;
    }
}
function brew(order) {
    if ("spiceLevel" in order) {
        return `Brewing masala chai with spice level: ${order.spiceLevel}`;
    }
    else {
        return `Brewing elaci chai with no: ${order.no}`;
    }
}
function isStringArray(arr) {
    return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}
export {};
//# sourceMappingURL=TypeNarrowing.js.map