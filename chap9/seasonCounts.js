"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seasonCounts = new Map([
    ["I love Lucy", "6"],
    ["The Golden Grils", "7"],
]);
// 타입: string : undefined
var maybeValue = seasonCounts.get("I love Lucy");
console.log(maybeValue.toUpperCase());
// Error: Property 'toUpperCase' does not exist on type 'number'.
// 타입: string
var knownValue = seasonCounts.get("I love Lucy");
// Error: Property 'toUpperCase' does not exist on type 'number'.
console.log(knownValue.toUpperCase());
