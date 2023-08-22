"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GradesTally {
    grades = [];
    addGrades(...grades) {
        this.grades.push(...grades);
        return this.grades.length;
    }
}
class ContinueGradesTally extends GradesTally {
    constructor(previousGrades) {
        this.grades = [...previousGrades];
        // Error:  'super' must be called before accessing 'this' in the constructor of a derived class.
        super();
        console.log("Starting with length", this.grades.length);
    }
}
