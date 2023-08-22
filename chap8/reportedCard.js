"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportCard {
    grades;
    constructor(grades) {
        this.grades = grades;
    }
    report() {
        return this.grades.join(", ");
    }
}
class Empty {
}
