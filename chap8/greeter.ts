class Greeter {
    greet(name: string) {
        console.log(`${name}, do tyour stuff!`);
    }
}

new Greeter().greet("Miss Frizzle");

new Greeter().greet();
// Error : Expected 1 arguments, but got 0.

export {};
