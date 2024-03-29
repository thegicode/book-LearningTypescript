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
        console.log("Short text", text === null || text === void 0 ? void 0 : text.length);
        // Error: Property 'length' does not exist on type 'never'.
    }
}
export {};
