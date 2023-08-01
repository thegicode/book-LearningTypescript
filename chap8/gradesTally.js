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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var GradesTally = /** @class */ (function () {
    function GradesTally() {
        this.grades = [];
    }
    GradesTally.prototype.addGrades = function () {
        var _a;
        var grades = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            grades[_i] = arguments[_i];
        }
        (_a = this.grades).push.apply(_a, grades);
        return this.grades.length;
    };
    return GradesTally;
}());
var ContinueGradesTally = /** @class */ (function (_super) {
    __extends(ContinueGradesTally, _super);
    function ContinueGradesTally(previousGrades) {
        var _this = this;
        _this.grades = __spreadArray([], previousGrades, true);
        _this = _super.call(this) || this;
        console.log("Starting with length", _this.grades.length);
        return _this;
    }
    return ContinueGradesTally;
}(GradesTally));
