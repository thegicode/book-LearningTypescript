"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var School = /** @class */ (function () {
    function School(name) {
        this.name = name;
    }
    return School;
}());
var Preschool = /** @class */ (function (_super) {
    __extends(Preschool, _super);
    function Preschool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preschool.prototype.getStudentTypes = function () {
        return ["preschooler"];
    };
    return Preschool;
}(School));
// Absence: 결석
var Absence = /** @class */ (function (_super) {
    __extends(Absence, _super);
    function Absence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Absence;
}(School));
var school;
school = new Preschool("Sunnyside Daycare");
school = new School("somewhere else");
