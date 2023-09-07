"use strict";
class PastGrades {
    constructor() {
        this.grades = [];
    }
}
class LabeledPastGrades extends PastGrades {
}
let subClass;
subClass = new LabeledPastGrades(); // Ok
subClass = new PastGrades(); // Ok
