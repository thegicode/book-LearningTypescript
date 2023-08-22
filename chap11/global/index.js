"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("./types/global");
function logData(data) {
    // Ok
    console.log(`Data version is: ${data.version}`);
}
logData(globalDeclared); // Ok
logData(global_1.locallyDeclared);
