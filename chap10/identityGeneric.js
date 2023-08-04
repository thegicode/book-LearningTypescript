"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identityGeneric(input) {
    return input;
}
var numeric = identityGeneric("me"); // type: "me"
var stringy = identityGeneric(123); // type: 123
var identityArrow = function (input) { return input; };
identityArrow(123); // type: 123
