"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curriedCallback_1 = require("./curriedCallback");
new curriedCallback_1.CurriedCallback((input) => {
    console.log(input.length);
});
new curriedCallback_1.CurriedCallback((input) => { });
// Error: Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
//   Types of parameters 'input' and 'input' are incompatible.
//   Type 'string' is not assignable to type 'boolean'.
