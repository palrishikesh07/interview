const p1 = {
    xp1: "I am Inside P1",
    length: "custom length"
};


const p2 = {
    xp2: "I am inside P2",
    __proto__: p1
}

const p3 = {
    xp2: "I am inside P3",
    __proto__: p2
}

console.log(`P2: `, p2.xp2);
console.log(`P2: `, p2.xp1);
console.log(`P3: `, p3.xp1);

//
console.log(`P1: `, p1.length);

