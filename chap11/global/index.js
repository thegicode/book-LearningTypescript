"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = require("./types/global");
function logData(data) {
    // Ok
    console.log("Data version is: ".concat(data.version));
}
logData(globalDeclared); // Ok
logData(global_1.locallyDeclared);
