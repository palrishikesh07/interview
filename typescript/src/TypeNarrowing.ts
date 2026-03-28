function getChai(kind: string | number) {
  if (typeof kind === "string") {
    // kind is narrowed to string
    return `Making chai with kind: ${kind}`;
  } else {
    // kind is narrowed to number
    return `Chai order: ${kind}`;
  }
}

function serveChai(msg?: string) {
  if (msg) {
    return `Serving chai: ${msg}`;
  }
  return `Serving default chai`;
}

function orderChai(size: "small" | "medium" | "large" | number) {
  if (size === "small") {
    return `Ordering small chai`;
  } else if (size === "medium" || size === "large") {
    return `Making extra chai`;
  } else {
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

function serve(chai: KulhadChai | Cutting) {
  if (chai instanceof KulhadChai) {
    return chai.serve();
  }
  return chai.serve();
}

// Making customing guard
type ChaiOrder = {
  type: string;
  sugar: number;
};

function isChaiOder(obj: any): obj is ChaiOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string" &&
    typeof obj.sugar === "number"
  );
}

function serverOrder(item: ChaiOrder | string) {
  if (isChaiOder(item)) {
    return `Serving ${item.type} chai with ${item.sugar} sugar`;
  }
  return `Serving default chai`;
}

type MasalaChai = {
  type: "Masala";
  spiceLevel: number;
};

type ElaciChai = {
  type: "Elaci";
  no: number;
};

type chai = MasalaChai | ElaciChai;

function makeChai(order: chai) {
  switch (order.type) {
    case "Masala":
      return `Making masala chai with spice level: ${order.spiceLevel}`;
    case "Elaci":
      return `Making elaci chai with no: ${order.no}`;
    default:
      break;
  }
}

function brew(order: MasalaChai | ElaciChai) {
  if ("spiceLevel" in order) {
    return `Brewing masala chai with spice level: ${order.spiceLevel}`;
  } else {
    return `Brewing elaci chai with no: ${order.no}`;
  }
}

function isStringArray(arr: unknown): arr is string[] {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}
