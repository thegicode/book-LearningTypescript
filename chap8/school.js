"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class School {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Preschool extends School {
    getStudentTypes() {
        return ["preschooler"];
    }
}
// Absence: 결석
class Absence extends School {
}
// Error: Non-abstract class 'Absence' does not implement all abstract members of 'School'
// 비추상 클래스 'Absence'은(는) 'School' 클래스에서 상속된 추상 멤버 'getStudentTypes'을(를) 구현하지 않습니다.
let school;
school = new Preschool("Sunnyside Daycare");
school = new School("somewhere else");
