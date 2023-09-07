"use strict";
class WithPropertyParameters {
    constructor() {
        this.tackesParameters = (input) => (input ? "yes" : "No");
    }
}
const instance = new WithPropertyParameters();
instance.tackesParameters(true); // Ok
instance.tackesParameters(123);
// Error : Argument of type 'number' is not assignable to parameter of type 'boolean'.
