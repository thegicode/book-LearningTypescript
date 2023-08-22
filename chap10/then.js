"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type: Promise<string>
const textEventually = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});
// type: Promise<number>
const lengthEvnetually = textEventually.then((text) => text.length);
