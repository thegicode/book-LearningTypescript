"use strict";
function makeTuple(first, second) {
    return [first, second];
}
let tuple = makeTuple(true, "abc");
// value: readonly [boolean, string] 타입
