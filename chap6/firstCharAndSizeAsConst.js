"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 반환 타입: readonly [string, number]
function firstCharAndSizeAsConst(input) {
    return [input[0], input.length];
}
// firstChar 타입 : string
// size 타입 : number
var _a = firstCharAndSizeAsConst("Ching Shin"), firstChar = _a[0], size = _a[1];
