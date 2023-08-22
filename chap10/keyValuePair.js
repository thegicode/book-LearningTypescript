"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type: KeyValuePair<string, number>
let allExpicit = {
    key: "rating",
    value: 10,
};
// type: KeyValuePair<string>
let OneDEfaulting = {
    key: "rating",
    value: "ten",
};
let firstMissing = {
    // Error: Generic type 'KeyValuePair<Key, Value>' requires between 1 and 2 type arguments.
    key: "rating",
    value: 10,
};
