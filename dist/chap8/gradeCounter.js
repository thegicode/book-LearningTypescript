class GradeCounter {
    countGrades(grades, letter) {
        return grades.filter((grade) => grade === letter).length;
    }
}
class FailureCounter extends GradeCounter {
    countGrades(grades) {
        return super.countGrades(grades, "F");
    }
}
class AnyFailureChecker extends GradeCounter {
    countGrades(grades) {
        // Error: TS2416: Property 'countGrades' in type 'AnyFailureChecker' is not assignable to the same property in base type 'GradeCounter'.
        //   Type '(grades: string[]) => boolean' is not assignable to type '(grades: string[], letter: string) => number'.
        //   Type 'boolean' is not assignable to type 'number'.
        return super.countGrades(grades, "F") !== 0;
    }
}
const counter = new AnyFailureChecker();
// 실제 타입 : boolean
const count = counter.countGrades(["A", "C", "F"]);
export {};
