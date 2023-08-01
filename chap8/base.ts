class Base {
    isPublicImpicit: 0;
    public isPublicExplicit = 1;
    protected isProtected = 2;
    private isPrivate = 3;
    #truePrivate = 4;
    // Error: Private identifiers are only available when targeting ECMAScript 2015 and higher.
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
// Error: Property 'isPrivate' is private and only accessible within class 'Base'.

export {};
