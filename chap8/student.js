"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Student = /** @class */ (function () {
    function Student(name) {
        this.name = name;
    }
    Student.prototype.study = function (hours) {
        for (var i = 0; i < hours; i++) {
            console.log("...studying...");
        }
    };
    return Student;
}());
var Slacker = /** @class */ (function () {
    function Slacker() {
    }
    return Slacker;
}());
var Student2 = /** @class */ (function () {
    function Student2() {
    }
    Student2.prototype.study = function (hours) { };
    return Student2;
}());
