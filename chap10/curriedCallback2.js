"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curriedCallback_1 = require("./curriedCallback");
new curriedCallback_1.CurriedCallback(function (input) {
    console.log(input.length);
});
new curriedCallback_1.CurriedCallback(function (input) { });
