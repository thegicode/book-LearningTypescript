class Teacher {
    teach() {
        console.log("The surest test of discipline is its absenece.");
    }
}
class StudentTeacher extends Teacher {
    learn() {
        console.log("I cannpt affored the luxury of a closed mind.");
    }
}
const teacher = new StudentTeacher();
teacher.teach();
teacher.learn();
teacher.other();
export {};
