import { CurriedCallback } from "./curriedCallback";
new CurriedCallback((input) => {
    console.log(input.length);
});
new CurriedCallback((input) => { });
// Error: Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
//   Types of parameters 'input' and 'input' are incompatible.
//   Type 'string' is not assignable to type 'boolean'.
