"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportCard = /** @class */ (function () {
    function ReportCard(grades) {
        this.grades = grades;
    }
    ReportCard.prototype.report = function () {
        return this.grades.join(", ");
    };
    return ReportCard;
}());
var Empty = /** @class */ (function () {
    function Empty() {
    }
    return Empty;
}());
