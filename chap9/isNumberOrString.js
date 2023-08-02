"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNumberOrString(value) {
    return ["number", "string"].includes(typeof value);
    // Error : : Property 'includes' does not exist on type 'string[]'.
    // Do you need to change your target library? Try changing the 'lib' compiler option to 'es2016' or later.
    // tsconfig compilerOption - "lib": ["es2016", "dom"] 추가했으나 계속 메시지가 나온다.
}
function logValueIfExists(value: number | string | null | undefined) {
    if (isNumberOrString(value)) {
        value.toString();
        // Error: 'value'은(는) 'null' 또는 'undefined'일 수 있습니다.
    } else {
        console.log("Value does not exist", value);
    }
}
