var AsNumber = /** @class */ (function () {
    function AsNumber() {
        this.age = 0;
    }
    return AsNumber;
}());
var NotAsNumber = /** @class */ (function () {
    function NotAsNumber() {
    }
    NotAsNumber.prototype.age = function () {
        return "";
    };
    return NotAsNumber;
}());
