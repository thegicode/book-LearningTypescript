"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poemMatch = {
    author: {
        firstName: "Sylyvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};
const poemMissmatch = {
    author: {
        name: "Sylyvia Plath",
        // Error: Type '{ name: string; }' is not assignable to type '{ firstName: string; lastName: string; }'.
        // Object literal may only specify known properties, and 'name' does not exist in type '{ firstName: string; lastName: string; }'.
    },
    name: "Tullips",
};
