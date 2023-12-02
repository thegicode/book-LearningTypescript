"use strict";
let stringBox = {
    inside: "abc",
};
let numberBox = {
    inside: 123,
};
let incorrectBox = {
    inside: false,
    // Error: Type 'boolean' is not assignable to type 'number'.
};
