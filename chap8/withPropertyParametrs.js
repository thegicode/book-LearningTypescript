var WithPropertyParameters = /** @class */ (function () {
    function WithPropertyParameters() {
        this.tackesParameters = function (input) { return (input ? "yes" : "No"); };
    }
    return WithPropertyParameters;
}());
var instance = new WithPropertyParameters();
instance.tackesParameters(true); // Ok
instance.tackesParameters(123);
