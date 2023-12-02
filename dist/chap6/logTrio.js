"use strict";
function logTrio(name, value) {
    console.log(`${name} has ${value[0]} ${value[1]}}`);
}
const trios = [
    ["Amanitore", [1, true]],
    ["Theland", [2, false]],
    ["Ann e. Durwoody", [3, false]],
];
trios.forEach((trio) => logTrio(...trio)); // Ok
trios.forEach(logTrio);
// Error : Argument of type '(name: string, value: [number, boolean]) => void' is not assignable to parameter of type
// '(value: [string, [number, boolean]], index: number, array: [string, [number, boolean]][]) => void'.
//   Types of parameters 'name' and 'value' are incompatible.
//   Type '[string, [number, boolean]]' is not assignable to type 'string'.
