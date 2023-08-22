"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type: Promise<unknown>
const resolveUnknown = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});
// type: Promise<string>
const resolveString = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});
