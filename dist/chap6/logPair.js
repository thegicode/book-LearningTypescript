"use strict";
function logPair(name, value) {
    console.log(`${name} is ${value}`);
}
const pairArray = ["Amage", 1];
logPair(...pairArray);
// Error :  A spread argument must either have a tuple type or be passed to a rest parameter.
const pairTupleIncorrect = [1, "Amage"];
logPair(...pairTupleIncorrect);
// Error : Argument of type 'number' is not assignable to parameter of type 'string'.
const pairTupleCorrect = ["Amage", 1];
logPair(...pairTupleCorrect); // Ok
