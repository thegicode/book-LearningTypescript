"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLongString(input) {
    return !!(input && input.length >= 7);
}
function workWithText(text) {
    if (isLongString(text)) {
        // text: string의 타입
        console.log("Long text:", text.length);
    }
    else {
        // text: undefined 타입
        console.log("Short text", text?.length);
        // Error: Property 'length' does not exist on type 'never'.
    }
}
