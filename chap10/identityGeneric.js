"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identityGeneric(input) {
    return input;
}
const numeric = identityGeneric("me"); // type: "me"
const stringy = identityGeneric(123); // type: 123
const identityArrow = (input) => input;
identityArrow(123); // type: 123
