// 반환 타입: (string, number)[]
function firstCharAndSize(input) {
    return [input[0], input.length];
}
// firstChar 타입: string | number
// size 타입: string | number
var _a = firstCharAndSize("Gudit"), firstChar = _a[0], size = _a[1];
console.log(firstChar, size);
