"use strict";
function fail(message) {
    throw new Error(`Invariant failure: ${message}`);
}
function workWithUnsafeParam(param) {
    if (typeof param !== "string") {
        fail(`param should be a string, not ${typeof param}`);
    }
    // 여기에서 param의 타입은 string으로 알려진다.
    param.toUpperCase();
}
workWithUnsafeParam(123);
