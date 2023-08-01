class Teacher {
    sayHello() {
        console.log(`Take changes, make mistake, get messy!`);
    }
}

let teacher: Teacher;

teacher = new Teacher();

teacher = "Wahoo!";
// Error : Type 'string' is not assignable to type 'Teacher'.
