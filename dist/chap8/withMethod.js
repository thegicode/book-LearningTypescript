"use strict";
class WithMethod {
    myMethod() { }
}
console.log(new WithMethod().myMethod === new WithMethod().myMethod); // true
