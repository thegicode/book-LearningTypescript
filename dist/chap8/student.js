class Student {
    constructor(name) {
        this.name = name;
    }
    study(hours) {
        for (let i = 0; i < hours; i++) {
            console.log(`...studying...`);
        }
    }
}
class Slacker {
}
class Student2 {
    // Error : 'name' 멤버에는 암시적으로 'any' 형식이 포함됩니다.
    study(hours) {
        // Error : 'hours' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다.
    }
}
export {};
