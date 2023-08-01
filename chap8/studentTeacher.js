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
var Teacher = /** @class */ (function () {
    function Teacher() {
    }
    Teacher.prototype.teach = function () {
        console.log("The surest test of discipline is its absenece.");
    };
    return Teacher;
}());
var StudentTeacher = /** @class */ (function (_super) {
    __extends(StudentTeacher, _super);
    function StudentTeacher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StudentTeacher.prototype.learn = function () {
        console.log("I cannpt affored the luxury of a closed mind.");
    };
    return StudentTeacher;
}(Teacher));
var teacher = new StudentTeacher();
teacher.teach();
teacher.learn();
teacher.other();
