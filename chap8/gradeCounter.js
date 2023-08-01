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
var GradeCounter = /** @class */ (function () {
    function GradeCounter() {
    }
    GradeCounter.prototype.countGrades = function (grades, letter) {
        return grades.filter(function (grade) { return grade === letter; }).length;
    };
    return GradeCounter;
}());
var FailureCounter = /** @class */ (function (_super) {
    __extends(FailureCounter, _super);
    function FailureCounter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FailureCounter.prototype.countGrades = function (grades) {
        return _super.prototype.countGrades.call(this, grades, "F");
    };
    return FailureCounter;
}(GradeCounter));
var AnyFailureChecker = /** @class */ (function (_super) {
    __extends(AnyFailureChecker, _super);
    function AnyFailureChecker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnyFailureChecker.prototype.countGrades = function (grades) {
        return _super.prototype.countGrades.call(this, grades, "F") !== 0;
    };
    return AnyFailureChecker;
}(GradeCounter));
var counter = new AnyFailureChecker();
// 예상한 타입: number
// 실제 타입 : boolean
var count = counter.countGrades(["A", "C", "F"]);
