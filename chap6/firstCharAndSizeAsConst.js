"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 반환 타입: readonly [string, number]
function firstCharAndSizeAsConst(input) {
    return [input[0], input.length];
}
// firstChar 타입 : string
// size 타입 : number
const [firstChar, size] = firstCharAndSizeAsConst("Ching Shin");
