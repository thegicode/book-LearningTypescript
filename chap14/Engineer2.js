"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engineer = /** @class */ (function () {
    function Engineer(area) {
        this.area = area;
        console.log("I work in ther ".concat(area, " area"));
    }
    return Engineer;
}());
new Engineer("mechanical").area;
