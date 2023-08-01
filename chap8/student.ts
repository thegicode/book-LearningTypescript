interface Learner {
    name: string;
    study(hours: number): void;
}

class Student implements Learner {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    study(hours: number) {
        for (let i = 0; i < hours; i++) {
            console.log(`...studying...`);
        }
    }
}

class Slacker implements Learner {
    // Error : Class 'Slacker' incorrectly implements interface 'Learner'.
    //   Type 'Slacker' is missing the following properties from type 'Learner': name, study
}

class Student2 implements Learner {
    name;
    // Error : 'name' 멤버에는 암시적으로 'any' 형식이 포함됩니다.

    study(hours) {
        // Error : 'hours' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다.
    }
}

export {};
