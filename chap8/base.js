class Base {
    constructor() {
        this.isPublicExplicit = 1;
        this.isProtected = 2;
        this.isPrivate = 3;
        _Base_truePrivate.set(this, 4);
        // Error: Private identifiers are only available when targeting ECMAScript 2015 and higher.
    }
}
_Base_truePrivate = new WeakMap();
class SubClass extends Base {
    examples() {
        this.isPublicImpicit; // Ok
        this.isPublicExplicit; // Ok
        this.isProtected; // Ok
        this.isPrivate;
        // Error: Property 'isPrivate' is private and only accessible within class 'Base'.
        this.;
        // Error: Property '#truePrivate' is not accessible outside class 'Base' because it has a private identifier.
    }
}
new SubClass().isPublicImpicit; // Ok
new SubClass().isPublicExplicit; // Ok
new SubClass().isProtected;
// Error: Property 'isProtected' is protected and only accessible within class 'Base' and its subclasses.
new SubClass().isPrivate;
export {};
