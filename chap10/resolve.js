"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type: Promise<unknown>
var resolveUnknown = new Promise(function (resolve) {
    setTimeout(function () { return resolve("Done!"); }, 1000);
});
// type: Promise<string>
var resolveString = new Promise(function (resolve) {
    setTimeout(function () { return resolve("Done!"); }, 1000);
});
