"use strict";
let valueLater;
valueLater = {
    born: 1935,
    name: "Sara Tesadale",
};
valueLater = "Emily Dickinson";
// Error : Type 'string' is not assignable to type 'Poet'.
valueLater = {
    born: true,
    // Error : Type 'boolean' is not assignable to type 'number'.
    name: "Sappho",
};
