"use strict";
function logWarriors(greeting, ...names) {
    for (const name of names) {
        console.log(`${greeting}, ${name}`);
    }
}
const warriors = ["Cathay Williams", "Lozen", "Nzinga"];
logWarriors("Hello", ...warriors);
const birthYears = [1844, 1840, 1583];
logWarriors("Born in", birthYears);
// Error : Argument of type 'number[]' is not assignable to parameter of type 'string'.
