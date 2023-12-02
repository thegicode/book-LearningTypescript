const seasonCounts = new Map([
    ["I love Lucy", "6"],
    ["The Golden Grils", "7"],
]);
// 타입: string : undefined
let maybeValue = seasonCounts.get("I love Lucy");
console.log(maybeValue.toUpperCase());
// Error: 'maybeValue'은(는) 'undefined'일 수 있습니다.
// 타입: string
const knownValue = seasonCounts.get("I love Lucy");
console.log(knownValue.toUpperCase());
export {};
