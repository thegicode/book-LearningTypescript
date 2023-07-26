var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// 타입: string[]
var soldiers = ["Harriet Tuban", "Joan of Arc", "Khutulun"];
// 타입: number[]
var soliierAges = [99, 19, 45];
// 타입: (string | number)[]
var conjoined = __spreadArray(__spreadArray([], soldiers, true), soliierAges, true);
