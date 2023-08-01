var MissingInitializer = /** @class */ (function () {
    function MissingInitializer() {
    }
    return MissingInitializer;
}());
new MissingInitializer().property.length;
// Runtime error : Cannot read properties of undefined (reading 'length')
