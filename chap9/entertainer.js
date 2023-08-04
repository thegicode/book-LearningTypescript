"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var declared = {
    // Error: Property 'acts' is missing in type '{ name: string; }' but required in type 'Entertainer'.
    name: "Moms Mabley",
};
var asserted = {
    name: "Moms Mabley",
};
console.log(declared.acts);
// console.log(declared.acts.join(", "));
// Runtime TypeError: Cannot read properties of undefined (reading 'join')
console.log(asserted.acts.join(", "));
