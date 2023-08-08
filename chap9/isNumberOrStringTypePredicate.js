"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNumberOrString(value) {
    return ["number", "string"].includes(typeof value);
}
function logValueIfExists(value) {
    if (isNumberOrString(value)) {
        // value: number | string 타입
        value.toString();
    }
    else {
        // value: null | undefined의 타입
        console.log("Value does not exist", value);
    }
}
