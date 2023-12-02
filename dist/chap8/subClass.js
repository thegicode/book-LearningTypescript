"use strict";
class PastGrades {
    grades = [];
}
class LabeledPastGrades extends PastGrades {
    label;
}
let subClass;
subClass = new LabeledPastGrades(); // Ok
subClass = new PastGrades(); // Ok
