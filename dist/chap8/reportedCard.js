class ReportCard {
    constructor(grades) {
        this.grades = grades;
    }
    report() {
        return this.grades.join(", ");
    }
}
class Empty {
}
export {};
