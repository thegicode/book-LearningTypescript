class Assignment {
    grade?: number;
}

class GradesAssignment extends Assignment {
    grade: number;

    constructor(grade: number) {
        super();
        this.grade = grade;
    }
}

export {};
