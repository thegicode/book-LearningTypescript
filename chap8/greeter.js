var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function (name) {
        console.log("".concat(name, ", do tyour stuff!"));
    };
    return Greeter;
}());
new Greeter().greet("Miss Frizzle");
new Greeter().greet();
