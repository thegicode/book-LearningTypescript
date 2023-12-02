"use strict";
// 반환 타입: (string | number)[]
function firstCharAndSize(input) {
    return [input[0], input.length];
}
// firstChar 타입: string | number
// size 타입: string | number
const [firstChar, size] = firstCharAndSize("Gudit");
console.log(firstChar, size);
