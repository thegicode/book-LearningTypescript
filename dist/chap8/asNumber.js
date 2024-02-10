class AsNumber {
    constructor() {
        this.age = 0;
        // Error:  Property 'age' in type 'AsNumber' is not assignable to the same property in base type 'AgeIsNotANumber'.
        //   Type 'number' is not assignable to type '() => string'.
    }
}
class NotAsNumber {
    age() {
        return "";
    }
}
export {};
