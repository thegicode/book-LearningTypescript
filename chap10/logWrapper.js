"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logWrapper(callback) {
    return (input) => {
        console.log("Input: ", input);
        callback(input);
    };
}
// type: (input: string) => void
logWrapper((input) => {
    console.log(input.length);
});
// type: (input: unknown) => void
logWrapper((input) => {
    console.log(input.length);
    // Error: Property 'length' does not exist on type 'unknown'.
});
// type: (input: string) => void
logWrapper((input) => {
    console.log(input.length);
});
logWrapper((input) => {
    // Error : Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
    //   Types of parameters 'input' and 'input' are incompatible.
    //   Type 'string' is not assignable to type 'boolean'.
});
logWrapper((input) => {
    //
});
