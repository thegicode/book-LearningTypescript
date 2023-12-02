class Base {
    isPublicImpicit;
    isPublicExplicit = 1;
    isProtected = 2;
    isPrivate = 3;
    #truePrivate = 4;
}
class SubClass extends Base {
    examples() {
        this.isPublicImpicit; // Ok
        this.isPublicExplicit; // Ok
        this.isProtected; // Ok
        this.isPrivate;
        // Error: Property 'isPrivate' is private and only accessible within class 'Base'.
        this.#truePrivate;
        // Error: Property '#truePrivate' is not accessible outside class 'Base' because it has a private identifier.
    }
}
new SubClass().isPublicImpicit; // Ok
new SubClass().isPublicExplicit; // Ok
new SubClass().isProtected;
// Error: Property 'isProtected' is protected and only accessible within class 'Base' and its subclasses.
new SubClass().isPrivate;
export {};
