class Greeted {
    constructor(message: string) {
        console.log(`As I always say: ${message}`);
    }
}

new Greeted("take chances, make mistackes, get messy");

new Greeted();
// Error : Expected 1 arguments, but got 0.

export {};
