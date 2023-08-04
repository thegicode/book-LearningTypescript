const seasonCounts = new Map([
    ["Broad City", "6"],
    ["Community", "7"],
]);

// type: string
const knownValue = seasonCounts.get("I love lucy")!;

console.log(knownValue.toUpperCase()); // 타입 오류는 아니지만, 런타임 오류가 발생함
// Runtime TypeError: Cannot read properties of undefined (reading 'toUpperCase')
