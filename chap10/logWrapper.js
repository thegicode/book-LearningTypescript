"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logWrapper(callback) {
    return function (input) {
        console.log("Input: ", input);
        callback(input);
    };
}
// type: (input: string) => void
logWrapper(function (input) {
    console.log(input.length);
});
// type: (input: unknown) => void
logWrapper(function (input) {
    console.log(input.length);
    // Error: Property 'length' does not exist on type 'unknown'.
});
// type: (input: string) => void
logWrapper(function (input) {
    console.log(input.length);
});
logWrapper(function (input) { });
