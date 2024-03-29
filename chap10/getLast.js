function getLast(node) {
    return node.next ? getLast(node.next) : node.value;
}
// 유추된 Value 타입 인수: Date
let lastDate = getLast({
    value: new Date("09-13-1993"),
});
console.log("lastDate: ", lastDate);
// Log : lastDate: 1993-09-12T15:00:00.000Z
// 유추된 Value 타입 인수: string
let lastFruit = getLast({
    next: {
        value: "banana",
    },
    value: "apple",
});
console.log("lastFruit: ", lastFruit);
// Log: lastFruit: banana
// 유추된 Value 타입 인수: number
let lastMismatch = getLast({
    next: {
        value: 123,
    },
    value: false,
    // Error: Type 'boolean' is not assignable to type 'number'.
});
console.log("lastMismatch: ", lastMismatch);
export {};
